import React from 'react'
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import BlogList from '../components/BlogList';
import NewsLetter from '../components/NewsLetter';
import Fotter from '../components/Fotter';

const Home = () => {
  return (
    <div className="container pt-3">
        <Navbar />
        <Header />
        <BlogList />
        <NewsLetter />
        <Fotter />
    </div>
  )
}

export default Home;
