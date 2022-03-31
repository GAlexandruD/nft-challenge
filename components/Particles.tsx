import Particles from 'react-tsparticles'

import FaEthereum from '@react-icons/all-files/fa/FaEthereum'
import FaBitcoin from '@react-icons/all-files/fa/FaBitcoin'
import SiLitecoin from '@react-icons/all-files/si/SiLitecoin'
import ImCoinEuro from '@react-icons/all-files/im/ImCoinEuro'
import ImCoinDollar from '@react-icons/all-files/im/ImCoinDollar'
import ImCoinPound from '@react-icons/all-files/im/ImCoinPound'
import ImCoinYen from '@react-icons/all-files/im/ImCoinYen'
import FaViacoin from '@react-icons/all-files/fa/FaViacoin'
import BiCoinStack from '@react-icons/all-files/bi/BiCoinStack'
import GiCoins from '@react-icons/all-files/gi/GiCoins'
import RiCoinsLine from '@react-icons/all-files/ri/RiCoinsLine'

const ParticlesTwo = () => {
  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: {
            value: '#164e62',
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'push',
            },
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: '#ffffff',
          },
          links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
      }}
    />
  )
}

export default ParticlesTwo
