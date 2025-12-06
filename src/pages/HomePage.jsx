import React from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import Slider from '../components/Slider';

const HomePage = () => {
    const posts = [
        {
            id: 1,
            author: "Doğa Derneği",
            avatar: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            content: "Bugün Mogan Gölü çevresinde yaptığımız temizlik etkinliğine katılan tüm gönüllülerimize teşekkür ederiz! 🌿 #DoğaİçinElele",
            image: "https://img.yeniankara.com.tr/rcman/Cw1280h720q95gc/storage/files/images/2025/05/09/a-ta7l.jpg",
            likes: 124,
            comments: 18,
            time: "2 saat önce"
        },
        {
            id: 2,
            author: "Eğitim Gönüllüleri",
            avatar: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            content: "Köy okullarındaki minik kardeşlerimiz için kitap toplama kampanyamız başladı. Desteklerinizi bekliyoruz! 📚",
            image: null,
            likes: 89,
            comments: 12,
            time: "5 saat önce"
        },
        {
            id: 3,
            author: "Sokak Canları",
            avatar: "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
            content: "Bu soğuk günlerde sokaktaki dostlarımızı unutmayalım. Mama desteği için profilimizdeki linke tıklayabilirsiniz. 🐕🐈",
            image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
            likes: 256,
            comments: 45,
            time: "1 gün önce"
        }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Slider />

            {posts.map(post => (
                <div key={post.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img src={post.avatar} alt={post.author} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div>
                                <h4 style={{ fontWeight: '600' }}>{post.author}</h4>
                                <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>{post.time}</span>
                            </div>
                        </div>
                        <button style={{ color: 'hsl(var(--text-muted))' }}><MoreHorizontal size={20} /></button>
                    </div>

                    <div style={{ padding: '0 1rem 1rem' }}>
                        <p style={{ marginBottom: post.image ? '1rem' : '0' }}>{post.content}</p>
                    </div>

                    {post.image && (
                        <img src={post.image} alt="Post content" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    )}

                    <div style={{ padding: '1rem', display: 'flex', gap: '1.5rem', borderTop: '1px solid hsl(var(--border) / 0.5)' }}>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--text-muted))' }}>
                            <Heart size={20} /> <span>{post.likes}</span>
                        </button>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--text-muted))' }}>
                            <MessageCircle size={20} /> <span>{post.comments}</span>
                        </button>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'hsl(var(--text-muted))', marginLeft: 'auto' }}>
                            <Share2 size={20} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HomePage;
