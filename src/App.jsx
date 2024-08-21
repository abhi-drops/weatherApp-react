import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Weather } from './components/Weather';
import { CSSTransition } from 'react-transition-group';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [vid, setVid] = useState('https://videos.pexels.com/video-files/2078401/2078401-uhd_2560_1440_30fps.mp4'); // Default video
  const [vidKey, setVidKey] = useState(0); // Key for the video element to force reload

  const API_KEY = 'c3544342b20d936a46f4e5fcf56dbd30';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

  const videos = {
    '01d': 'https://videos.pexels.com/video-files/2078401/2078401-uhd_2560_1440_30fps.mp4',
    '02d': 'https://videos.pexels.com/video-files/6051402/6051402-uhd_2560_1440_25fps.mp4',
    '03d': 'https://videos.pexels.com/video-files/12794167/12794167-uhd_2560_1440_25fps.mp4',
    '04d': 'https://videos.pexels.com/video-files/5040711/5040711-hd_1920_1080_30fps.mp4',
    '09d': 'https://videos.pexels.com/video-files/2876754/2876754-hd_1920_1080_25fps.mp4',
    '10d': 'https://videos.pexels.com/video-files/4828773/4828773-hd_1920_1080_25fps.mp4', // Corrected key to '10d'
    '11d': 'https://videos.pexels.com/video-files/2657691/2657691-hd_1920_1080_30fps.mp4', // Corrected key to '11d'
    '13d': 'https://videos.pexels.com/video-files/857032/857032-hd_1920_1080_30fps.mp4',
    '50d': 'https://videos.pexels.com/video-files/1779202/1779202-hd_1280_720_25fps.mp4',
    '01n': 'https://videos.pexels.com/video-files/10079386/10079386-hd_1620_1080_25fps.mp4',
    '02n': 'https://videos.pexels.com/video-files/854739/854739-hd_1920_1080_30fps.mp4',
    '03n': 'https://videos.pexels.com/video-files/6601416/6601416-hd_1920_1080_30fps.mp4',
    '04n': 'https://videos.pexels.com/video-files/8064154/8064154-hd_1920_1080_30fps.mp4',
    '09n': 'https://videos.pexels.com/video-files/4458845/4458845-hd_1920_1080_30fps.mp4',
    '10n': 'https://videos.pexels.com/video-files/1484703/1484703-hd_1920_1080_25fps.mp4', // Corrected key to '10n'
    '11n': 'https://videos.pexels.com/video-files/5908584/5908584-hd_1920_1080_25fps.mp4', // Corrected key to '11n'
    '13n': 'https://videos.pexels.com/video-files/14034895/14034895-hd_1920_1080_24fps.mp4',
    '50n': 'https://videos.pexels.com/video-files/15040626/15040626-uhd_2560_1440_25fps.mp4',
  };

  useEffect(() => {
    console.log(vid);
  }, [vid]);

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          setData(response.data);
          const weatherIcon = response.data.weather[0].icon;
          if (weatherIcon) {
            const newVid = videos[weatherIcon] || videos['01d']; // Default to clear day if no match
            setVid(newVid);
            setVidKey(prevKey => prevKey + 1); // Increment the key to force reload
          }
        });
      setLocation('');
    }
  };

  function handleSearch() {

      axios.get(url)
        .then((response) => {
          setData(response.data);
          const weatherIcon = response.data.weather[0].icon;
          if (weatherIcon) {
            const newVid = videos[weatherIcon] || videos['01d']; // Default to clear day if no match
            setVid(newVid);
            setVidKey(prevKey => prevKey + 1); // Increment the key to force reload
          }
        });
      setLocation('');
  };

  return (
    <>
      <video key={vidKey} autoPlay muted loop className='fixed w-screen h-screen object-cover'>
        <source src={vid} type="video/mp4" />
      </video>
      <div className='w-screen h-screen fixed'>
        <div className='text-center p-4 flex justify-center'>
          <div className='mt-20 py-3 px-6  w-full md:w-2/4  text-lg rounded-lg border-gray-200  glass shadow-md text-white flex items-center'>
            <input
              type="text"
              className='bg-transparent w-full placeholder:text-gray-100 focus:outline-none'
              placeholder='Enter Location'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={searchLocation}
            />
            <i className="fa-solid fa-magnifying-glass cursor-pointer" onClick={handleSearch}></i>
          </div>
        </div>
        <CSSTransition in={!!data.weather} timeout={300} classNames="fade" unmountOnExit>
          <Weather weatherData={data} />
        </CSSTransition>
      </div>
    </>
  );
}

export default App;
