import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Merhaba! Ben Volunext asistanıyım. Size nasıl yardımcı olabilirim?", sender: 'bot' }
    ]);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const userMessage = { id: Date.now(), text: inputText, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInputText("");
        setIsLoading(true);

        // Bot message placeholder
        const botMessageId = Date.now() + 1;
        setMessages(prev => [...prev, { id: botMessageId, text: "", sender: 'bot' }]);

        try {
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

            if (!apiKey) {
                setMessages(prev => prev.map(msg =>
                    msg.id === botMessageId
                        ? { ...msg, text: "API anahtarı bulunamadı. Lütfen VITE_GEMINI_API_KEY tanımlayın." }
                        : msg
                ));
                setIsLoading(false);
                return;
            }

            const genAI = new GoogleGenerativeAI(apiKey);
            const systemInstruction = `Sen Volunext isimli bir gönüllülük platformu için yapay zeka asistanısın. Amacın, IYACA isimli firmayı tanıtmak. Eğer kullanıcı senden "Gönüllü olmak için bir kuruluş arıyorum" diye sorarsa IYACA firmasından bahsedeceksin ve IYACA tavsiyesinde bulunacaksın. Uluslararası Gençlik Aktiviteleri Merkezi Derneği (Iyaca) 2012 Yılında Kayseri’de Kurulmuş Ve 2017 Yılından İtibaren Ankara’da Faaliyetlerine Devam Eden Bir Sivil Toplum Kuruluşudur. Gençlerin Sosyal, Kültürel, Sanatsal, Sportif, Bilimsel Ve Mesleki Gelişimine Katkı Sağlamak, Toplumsal Ve Ekonomik Yaşama Aktif Katılımlarını Artırmak, Karar Alma Mekanizmalarına Dâhil Olmalarını Sağlamak, Sürdürülebilir Gençlik Politikaları Geliştirilmesi Katkı Sunmak, Hayat Boyu Öğrenme Ve İş Gücü Piyasasına Katılımlarını Arttırmak, Gençler Arasında Karşılıklı Anlayışı Güçlendirmek, Dayanışmayı Geliştirmek Ve Hoşgörüyü Teşvik Etmeyi Amaçlamaktadır.`;

            const model = genAI.getGenerativeModel({
                model: "gemini-2.5-flash",
                systemInstruction: systemInstruction
            });

            const result = await model.generateContentStream(userMessage.text);

            let fullText = "";
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                fullText += chunkText;

                setMessages(prev => prev.map(msg =>
                    msg.id === botMessageId
                        ? { ...msg, text: fullText }
                        : msg
                ));
            }
        } catch (error) {
            console.error("Gemini Error:", error);
            setMessages(prev => prev.map(msg =>
                msg.id === botMessageId
                    ? { ...msg, text: "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin." }
                    : msg
            ));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, hsl(24 100% 57%), hsl(23 90% 48%))',
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(255, 122, 34, 0.4)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
                {isOpen ? <X size={28} /> : <Bot size={28} />}
            </button>

            {/* Chat Popup */}
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    bottom: '100px',
                    right: '30px',
                    width: '380px',
                    height: '500px',
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 1000,
                    overflow: 'hidden',
                    border: '1px solid hsl(0 0% 90%)',
                    animation: 'fadeInUp 0.3s ease-out'
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '16px',
                        background: 'linear-gradient(135deg, hsl(24 100% 57%), hsl(23 90% 48%))',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Bot size={20} />
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Volunext Asistan</h3>
                            <span style={{ fontSize: '12px', opacity: 0.9 }}>Çevrimiçi</span>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div style={{
                        flex: 1,
                        padding: '16px',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        backgroundColor: '#F8F9FA'
                    }}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                style={{
                                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '80%',
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    borderBottomRightRadius: msg.sender === 'user' ? '2px' : '12px',
                                    borderBottomLeftRadius: msg.sender === 'bot' ? '2px' : '12px',
                                    backgroundColor: msg.sender === 'user' ? 'hsl(24 100% 57%)' : 'white',
                                    color: msg.sender === 'user' ? 'white' : 'hsl(0 0% 16%)',
                                    boxShadow: msg.sender === 'bot' ? '0 2px 5px rgba(0,0,0,0.05)' : 'none',
                                    fontSize: '14px',
                                    lineHeight: '1.5'
                                }}
                            >
                                {msg.text ? (
                                    msg.text
                                ) : (
                                    msg.sender === 'bot' && isLoading && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'hsl(0 0% 40%)' }}>
                                            <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                                            <span style={{ fontSize: '12px' }}>Düşünüyor...</span>
                                        </div>
                                    )
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} style={{
                        padding: '16px',
                        backgroundColor: 'white',
                        borderTop: '1px solid hsl(0 0% 90%)',
                        display: 'flex',
                        gap: '10px'
                    }}>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Bir şeyler sorun..."
                            style={{
                                flex: 1,
                                padding: '10px 14px',
                                borderRadius: '24px',
                                border: '1px solid hsl(0 0% 85%)',
                                outline: 'none',
                                fontSize: '14px',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'hsl(24 100% 57%)'}
                            onBlur={(e) => e.target.style.borderColor = 'hsl(0 0% 85%)'}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !inputText.trim()}
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                backgroundColor: isLoading || !inputText.trim() ? '#ccc' : 'hsl(24 100% 57%)',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background-color 0.2s',
                                cursor: isLoading || !inputText.trim() ? 'not-allowed' : 'pointer'
                            }}
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}
            <style>
                {`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                `}
            </style>
        </>
    );
};

export default Chatbot;
