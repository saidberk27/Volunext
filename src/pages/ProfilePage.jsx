import React, { useEffect, useState } from 'react';
import VolunteerProfile from '../components/VolunteerProfile';
import OrganizationProfile from '../components/OrganizationProfile';

const ProfilePage = () => {
    const [role, setRole] = useState('volunteer'); // Default to volunteer if none found

    useEffect(() => {
        const storedRole = localStorage.getItem('userRole');
        if (storedRole) {
            setRole(storedRole);
        }
    }, []);

    return (
        <>
            {role === 'organization' ? <OrganizationProfile /> : <VolunteerProfile />}
        </>
    );
};

export default ProfilePage;
