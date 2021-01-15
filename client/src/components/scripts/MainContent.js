import React from 'react';
import '../styles/MainContent.scss'
import Card from "./Card";
import ImgCloud from '../../images/icon-cloud.png'
import ImgLock from '../../images/icon-lock.png'
import ImgDevices from '../../images/icon-devices.png'


function MainContent() {
    const cards = [
        {
            icon: ImgCloud,
            iconAlt: 'Design',
            title: 'Clean Design',
            subtitle: 'Increase sales by showing true dynamics of your website.'
        },
        {
            icon: ImgLock,
            iconAlt: 'Secure',
            title: 'Secure Data',
            subtitle: 'Build your online store’s trust using Social Proof & Urgency.',
        },
        {
            icon: ImgDevices,
            iconAlt: 'Retina',
            title: 'Retina Ready',
            subtitle: 'Realize importance of social proof in customer’s purchase decision.',
        }
    ]

    return <main className='main'>
        <div className="main__title">
            Why <strong>small business owners
            love</strong> AppCo?
        </div>
        <div className="main__subtitle">Our design projects are fresh and simple and will benefit your business greatly.
            Learn more about our work!
        </div>
        <div className="cards">
            {cards.map((item, idx) =>
                <Card key={idx} icon={item.icon} iconAlt={item.iconAlt} title={item.title} subtitle={item.subtitle}/>
            )}
        </div>
    </main>
}

export default MainContent;