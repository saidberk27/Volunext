import React, { useEffect, useRef, useState } from 'react';
import * as Cesium from 'cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css';
import './MapPage.css';

// Cesium Ion Token
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2YTRiZjBlOC1hN2FkLTQyNTktOTk1ZS02MWVhZDQyYjUzOWEiLCJpZCI6MzQxNjE4LCJpYXQiOjE3NTc5ODE3MTF9.VJIXDbz8LVzRzK3AVc5DYvbRxohwJuXo77sMexeCuP0';

const sampleProjects = [
    {
        id: 1,
        name: "Orman Temizliği",
        latitude: 41.0082,
        longitude: 28.9784,
        participants: 15,
        startDate: new Date('2024-12-06T14:00:00'),
        status: 'active'
    },
    {
        id: 2,
        name: "Sahil Temizliği",
        latitude: 41.0150,
        longitude: 28.9850,
        participants: 8,
        startDate: new Date('2024-12-06T16:00:00'),
        status: 'waiting'
    },
    {
        id: 3,
        name: "Ağaç Dikimi",
        latitude: 41.0050,
        longitude: 28.9700,
        participants: 22,
        startDate: new Date('2024-12-05T08:00:00'),
        status: 'completed'
    }
];

const MapPage = () => {
    const cesiumContainerRef = useRef(null);
    const viewerRef = useRef(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [userLocation, setUserLocation] = useState({ latitude: null, longitude: null });
    const [connectionStatus, setConnectionStatus] = useState({ connected: false, message: 'Bağlantı Bekleniyor...' });
    const [alert, setAlert] = useState({ show: false, message: '' });
    const [modal, setModal] = useState({ show: false, location: null });

    // Non-state refs for mutable data that doesn't trigger re-renders or used in effects
    const volunteerProjectsRef = useRef([]);
    const userRegistrationsRef = useRef(new Set());
    const newProjectHandlerRef = useRef(null);
    const isCreatingProjectRef = useRef(false);

    // Helpers
    const toRad = (degrees) => degrees * (Math.PI / 180);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const formatDateTime = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleString('tr-TR', options);
    };

    const getProjectStatus = (project) => {
        const now = new Date();
        const startDate = new Date(project.startDate);
        const endDate = new Date(startDate.getTime() + 8 * 3600000);
        const fifteenMinutesAfter = new Date(endDate.getTime() + 15 * 60000);

        if (now < startDate) return { status: 'waiting', color: Cesium.Color.YELLOW, text: 'Başlamadı ⏳', textColor: '#ffaa00' };
        if (now >= startDate && now < endDate) return { status: 'active', color: Cesium.Color.LIME, text: 'Devam Ediyor ✅', textColor: '#00ff88' };
        if (now >= endDate && now < fifteenMinutesAfter) return { status: 'completed', color: Cesium.Color.RED, text: 'Tamamlandı 🔴', textColor: '#ff4444' };
        return { status: 'expired', color: null, text: 'Süresi Doldu', textColor: '#gray' };
    };

    const createCircleCanvas = (fillColor) => {
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        const centerX = 50, centerY = 50, radius = 20;

        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();

        ctx.shadowColor = 'transparent';

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius - 8, 0, 2 * Math.PI);
        ctx.fillStyle = fillColor.toCssColorString();
        ctx.fill();

        ctx.beginPath();
        ctx.arc(centerX - 12, centerY - 12, 10, 0, 2 * Math.PI);
        const gradient = ctx.createRadialGradient(centerX - 12, centerY - 12, 0, centerX - 12, centerY - 12, 10);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();
        return canvas.toDataURL();
    };

    const createUserLocationCanvas = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 80;
        canvas.height = 80;
        const ctx = canvas.getContext('2d');
        const centerX = 40, centerY = 40;

        ctx.beginPath();
        ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(33, 150, 243, 0.3)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI);
        ctx.fillStyle = '#2196F3';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();
        return canvas.toDataURL();
    };

    // Initialize Viewer
    useEffect(() => {
        if (!cesiumContainerRef.current) return;

        console.log('Cesium Viewer init...');
        const imageryViewModels = Cesium.createDefaultImageryProviderViewModels();
        const osmViewModel = imageryViewModels.find(
            model => model.name.includes('OpenStreetMap') || model.tooltip?.includes('OpenStreetMap')
        );

        const viewer = new Cesium.Viewer(cesiumContainerRef.current, {
            imageryProviderViewModels: imageryViewModels,
            selectedImageryProviderViewModel: osmViewModel || imageryViewModels[0],
            baseLayerPicker: true,
            geocoder: false,
            homeButton: false, // Disabling some widgets
            sceneModePicker: false,
            navigationHelpButton: false,
            fullscreenButton: false, // Often interferes with layout
            animation: false,
            timeline: false,
            infoBox: false,
            sceneMode: Cesium.SceneMode.SCENE2D,
            selectionIndicator: false,
        });

        viewerRef.current = viewer;

        viewer.scene.morphTo2D(0);
        viewer.scene.requestRenderMode = false;
        viewer.scene.globe.enableLighting = false;
        viewer.scene.skyAtmosphere.show = true;
        viewer.scene.globe.baseColor = Cesium.Color.fromCssColorString('#0e1a28');
        viewer.scene.fxaa = true;
        viewer.resolutionScale = 1.0;
        viewer.clock.shouldAnimate = false;
        viewer.scene.globe.depthTestAgainstTerrain = false;

        viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(28.9784, 41.0082, 50000),
            orientation: {
                heading: Cesium.Math.toRadians(0),
                pitch: Cesium.Math.toRadians(-90),
                roll: 0.0
            }
        });

        // Click Handler
        const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction((click) => {
            const pickedObject = viewer.scene.pick(click.position);
            if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id)) {
                if (pickedObject.id.id && typeof pickedObject.id.id === 'string' && pickedObject.id.id.startsWith('project_')) {
                    const projectData = pickedObject.id.properties.projectData.getValue();
                    showProjectDetails(projectData);
                }
            } else {
                // Only hide if we are not creating a project
                if (!isCreatingProjectRef.current) {
                    setSelectedProject(null);
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        // Initial Data Load
        showAllProjects(viewer);

        return () => {
            if (viewerRef.current) {
                viewerRef.current.destroy();
                viewerRef.current = null;
            }
        };
    }, []);

    // Monitoring Loop
    useEffect(() => {
        const interval = setInterval(() => {
            const viewer = viewerRef.current;
            if (!viewer) return;

            volunteerProjectsRef.current.forEach(({ entity, data }) => {
                const statusInfo = getProjectStatus(data);
                if (statusInfo.status === 'expired') {
                    viewer.entities.remove(entity);
                } else {
                    entity.billboard.image = createCircleCanvas(statusInfo.color);
                }
            });

            // Filter out expired (assuming we removed them from map, we should also remove from list ref if we want to be strict, but Cesium entitiy removal is main visual)
            volunteerProjectsRef.current = volunteerProjectsRef.current.filter(({ entity }) =>
                viewer.entities.contains(entity)
            );

            if (selectedProject) {
                const statusInfo = getProjectStatus(selectedProject);
                if (statusInfo.status === 'expired') {
                    setSelectedProject(null);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [selectedProject]);

    // Geolocation
    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const newLocation = { latitude: position.coords.latitude, longitude: position.coords.longitude };
                    setUserLocation(newLocation);
                    updateUserMarker(newLocation);

                    if (viewerRef.current && !viewerRef.current.camera._hasMoved) {
                        viewerRef.current.camera.flyTo({
                            destination: Cesium.Cartesian3.fromDegrees(newLocation.longitude, newLocation.latitude, 10000),
                            duration: 2
                        });
                        viewerRef.current.camera._hasMoved = true;
                    }
                },
                (error) => {
                    console.warn('Geolocation error:', error);
                    setAlert({ show: true, message: 'Konum izni verilmedi.' });
                },
                { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
            );
            return () => navigator.geolocation.clearWatch(watchId);
        } else {
            setAlert({ show: true, message: 'Tarayıcı konum desteklemiyor.' });
        }
    }, []);

    // Add projects Effect (on mount mostly, but generic)
    const showAllProjects = (viewer) => {
        if (!viewer) return;
        viewer.entities.removeAll();
        volunteerProjectsRef.current = [];

        sampleProjects.forEach(project => {
            createProjectMarker(viewer, project);
        });

        updateUserMarker(userLocation); // Restore user marker if location known
        setConnectionStatus({ connected: true, message: `${sampleProjects.length} Etkinlik Yüklendi` });
    };

    const createProjectMarker = (viewer, project) => {
        const statusInfo = getProjectStatus(project);
        if (statusInfo.status === 'expired') return;

        const entity = viewer.entities.add({
            id: `project_${project.id}`,
            position: Cesium.Cartesian3.fromDegrees(project.longitude, project.latitude, 0),
            billboard: {
                image: createCircleCanvas(statusInfo.color),
                width: 50,
                height: 50,
                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            },
            label: {
                text: project.name,
                font: 'bold 18px sans-serif',
                fillColor: Cesium.Color.BLACK,
                style: Cesium.LabelStyle.FILL,
                showBackground: false,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                pixelOffset: new Cesium.Cartesian2(0, -25),
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            },
            properties: {
                projectData: project
            }
        });

        volunteerProjectsRef.current.push({ entity, data: project });
    };

    const updateUserMarker = (location) => {
        if (!viewerRef.current || !location.latitude) return;
        const viewer = viewerRef.current;

        let userMarker = viewer.entities.getById('user_location');
        if (userMarker) viewer.entities.remove(userMarker);

        viewer.entities.add({
            id: 'user_location',
            position: Cesium.Cartesian3.fromDegrees(location.longitude, location.latitude, 0),
            billboard: {
                image: createUserLocationCanvas(),
                width: 40,
                height: 40,
                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            },
            label: {
                text: 'Konumunuz',
                font: 'bold 18px sans-serif',
                fillColor: Cesium.Color.BLACK,
                style: Cesium.LabelStyle.FILL,
                showBackground: false,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                pixelOffset: new Cesium.Cartesian2(0, -25),
                disableDepthTestDistance: Number.POSITIVE_INFINITY
            }
        });
    };

    const showProjectDetails = (project) => {
        setSelectedProject({ ...project }); // Clone to ensure state update
    };

    // Actions
    const handleJoinProject = () => {
        if (!selectedProject) return;
        if (userRegistrationsRef.current.has(selectedProject.id)) {
            setAlert({ show: true, message: 'Bu etkinliğe zaten katıldınız!' });
            return;
        }
        userRegistrationsRef.current.add(selectedProject.id);

        // Update local object
        const updatedProject = { ...selectedProject, participants: selectedProject.participants + 1 };
        setSelectedProject(updatedProject);

        // Update global sample data (mock)
        const idx = sampleProjects.findIndex(p => p.id === updatedProject.id);
        if (idx !== -1) sampleProjects[idx].participants = updatedProject.participants;

        // Update existing marker label/data? Marker update loop handles visual status, but data prop needs update if we use it
        // Ideally we update the entity property
        const entityPair = volunteerProjectsRef.current.find(p => p.data.id === updatedProject.id);
        if (entityPair) {
            entityPair.data.participants = updatedProject.participants;
            entityPair.entity.properties.projectData = updatedProject;
        }

        setAlert({ show: true, message: `"${updatedProject.name}" etkinliğine başarıyla katıldınız!` });
    };

    const handleMeasureDistance = () => {
        if (!selectedProject) return;
        if (!userLocation.latitude) {
            setAlert({ show: true, message: 'Konumunuz alınamadı.' });
            return;
        }
        const dist = calculateDistance(userLocation.latitude, userLocation.longitude, selectedProject.latitude, selectedProject.longitude);
        const distText = dist < 1 ? `${(dist * 1000).toFixed(0)} metre` : `${dist.toFixed(2)} kilometre`;
        setAlert({ show: true, message: `<strong>${selectedProject.name}</strong> etkinliğine olan mesafeniz:\n${distText}` });
    };

    // Create Project Flow
    const startProjectCreation = () => {
        if (isCreatingProjectRef.current) {
            cancelProjectCreation();
            return;
        }
        isCreatingProjectRef.current = true;

        if (viewerRef.current) {
            viewerRef.current.canvas.style.cursor = 'crosshair';
            setAlert({ show: true, message: 'Lütfen harita üzerinden etkinliğin yapılacağı konumu seçiniz.\nİptal etmek için ESC tuşuna basın.' });

            newProjectHandlerRef.current = new Cesium.ScreenSpaceEventHandler(viewerRef.current.scene.canvas);
            newProjectHandlerRef.current.setInputAction((click) => {
                const ray = viewerRef.current.camera.getPickRay(click.position);
                const cartesian = viewerRef.current.scene.globe.pick(ray, viewerRef.current.scene);

                if (cartesian) {
                    const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
                    const longitude = Cesium.Math.toDegrees(cartographic.longitude);
                    const latitude = Cesium.Math.toDegrees(cartographic.latitude);

                    setAlert({ show: false, message: '' }); // Close alert
                    setModal({ show: true, location: { latitude, longitude } });

                    cancelProjectCreation(); // Stop picking
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

            // Add ESC listener
            document.addEventListener('keydown', handleEscapeKey);
        }
    };

    const cancelProjectCreation = () => {
        isCreatingProjectRef.current = false;
        if (viewerRef.current) viewerRef.current.canvas.style.cursor = 'default';
        if (newProjectHandlerRef.current) {
            newProjectHandlerRef.current.destroy();
            newProjectHandlerRef.current = null;
        }
        document.removeEventListener('keydown', handleEscapeKey);
    };

    const handleEscapeKey = (e) => {
        if (e.key === 'Escape') {
            cancelProjectCreation();
            setAlert({ show: true, message: 'Etkinlik oluşturma iptal edildi.' });
        }
    };

    const handleCreateProjectSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        if (!modal.location) return;

        const newProject = {
            id: Date.now(),
            name: formData.get('projectName'),
            startDate: new Date(formData.get('startTime')),
            participants: parseInt(formData.get('participants')),
            latitude: modal.location.latitude,
            longitude: modal.location.longitude,
            status: 'waiting'
        };

        sampleProjects.push(newProject);
        if (viewerRef.current) {
            createProjectMarker(viewerRef.current, newProject);
            viewerRef.current.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(newProject.longitude, newProject.latitude, 5000),
                duration: 2
            });
        }

        setModal({ show: false, location: null });
        setAlert({ show: true, message: `✅ "${newProject.name}" etkinliği başarıyla oluşturuldu!` });
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
            <div id="cesiumContainer" ref={cesiumContainerRef} />

            {/* Details Panel */}
            {selectedProject && (
                <div className="telemetry-panel" style={{ display: 'block' }}>
                    <h2>Etkinlik Detayları</h2>
                    <div className="telemetry-content">
                        {/* Using the user's HTML structure but mapping to data */}
                        <div className="telemetry-item">
                            <span className="telemetry-label">Etkinlik Adı</span>
                            <span className="telemetry-value">{selectedProject.name}</span>
                        </div>
                        <div className="telemetry-item">
                            <span className="telemetry-label">Katılımcılar</span>
                            <span className="telemetry-value">{selectedProject.participants} Kişi</span>
                        </div>
                        <div className="telemetry-item">
                            <span className="telemetry-label">Başlangıç</span>
                            <span className="telemetry-value">{formatDateTime(new Date(selectedProject.startDate))}</span>
                        </div>
                        <div className="telemetry-item">
                            <span className="telemetry-label">Durum</span>
                            {(() => {
                                const status = getProjectStatus(selectedProject);
                                return <span className="telemetry-value" style={{ color: status.textColor }}>{status.text}</span>;
                            })()}
                        </div>
                        <div className="telemetry-item">
                            <span className="telemetry-label">Konum</span>
                            <span className="telemetry-value">{selectedProject.latitude.toFixed(4)}°, {selectedProject.longitude.toFixed(4)}°</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="action-buttons">
                        <button
                            className="action-btn join"
                            onClick={handleJoinProject}
                            disabled={userRegistrationsRef.current.has(selectedProject.id)}
                            style={userRegistrationsRef.current.has(selectedProject.id) ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                        >
                            {userRegistrationsRef.current.has(selectedProject.id) ? '✓ Katıldınız' : 'Etkinliğe Katıl'}
                        </button>
                        <button className="action-btn measure" onClick={handleMeasureDistance}>
                            Mesafe Ölç
                        </button>
                    </div>
                </div>
            )}

            {/* Connection Status */}
            <div className="connection-status">
                <span className={`status-indicator ${connectionStatus.connected ? 'connected' : ''}`}></span>
                <span>{connectionStatus.message}</span>
            </div>

            {/* Control Panel */}
            <div className="control-panel">
                <button className="control-btn secondary" onClick={() => showAllProjects(viewerRef.current)}>
                    LİSTELE
                </button>
                <button className="control-btn" onClick={startProjectCreation}>
                    + YENİ PROJE
                </button>
            </div>

            {/* Modal */}
            <div className={`project-modal ${modal.show ? 'active' : ''}`}>
                <div className="modal-content">
                    <h2>Yeni Proje Oluştur</h2>
                    {modal.location && (
                        <div className="location-info">
                            📍 Konum: {modal.location.latitude.toFixed(4)}°, {modal.location.longitude.toFixed(4)}°
                        </div>
                    )}
                    <form onSubmit={handleCreateProjectSubmit}>
                        <div className="form-group">
                            <label htmlFor="projectName">ETKİNLİK ADI</label>
                            <input type="text" name="projectName" required placeholder="Örn: Orman Temizliği" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="startTime">BAŞLANGIÇ ZAMANI</label>
                            <input type="datetime-local" name="startTime" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="participants">KATILIMCI HEDEFİ</label>
                            <input type="number" name="participants" defaultValue="10" min="1" required />
                        </div>
                        <div className="modal-buttons">
                            <button type="button" className="modal-btn cancel" onClick={() => setModal({ show: false, location: null })}>
                                İPTAL
                            </button>
                            <button type="submit" className="modal-btn create">
                                OLUŞTUR
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Alert */}
            {alert.show && (
                <div className="custom-alert-overlay" style={{ display: 'flex' }}>
                    <div className="custom-alert-box">
                        <div className="custom-alert-message" dangerouslySetInnerHTML={{ __html: alert.message.replace(/\n/g, '<br/>') }}></div>
                        <button className="custom-alert-button" onClick={() => setAlert({ show: false, message: '' })}>
                            TAMAM
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapPage;
