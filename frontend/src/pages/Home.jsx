import React from 'react';
import Hero from '../components/Hero';
import FeaturedCollection from '../components/FeaturedCollection';
import WhyChooseUs from '../components/WhyChooseUs';
import LovedByCollectors from '../components/LovedByCollectors';

const Home = () => {
    return (
        <>
            <Hero />
            <FeaturedCollection />
            <WhyChooseUs />
            <LovedByCollectors />
        </>
    );
};

export default Home;
