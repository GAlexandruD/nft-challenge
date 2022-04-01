import Particles from 'react-tsparticles'

import { FaEthereum } from '@react-icons/all-files/fa/FaEthereum'
import { FaBitcoin } from '@react-icons/all-files/fa/FaBitcoin'
import { SiLitecoin } from '@react-icons/all-files/si/SiLitecoin'
import { ImCoinEuro } from '@react-icons/all-files/im/ImCoinEuro'
import { ImCoinDollar } from '@react-icons/all-files/im/ImCoinDollar'
import { ImCoinPound } from '@react-icons/all-files/im/ImCoinPound'
import { ImCoinYen } from '@react-icons/all-files/im/ImCoinYen'
import { FaViacoin } from '@react-icons/all-files/fa/FaViacoin'
import { BiCoinStack } from '@react-icons/all-files/bi/BiCoinStack'
import { GiCoins } from '@react-icons/all-files/gi/GiCoins'
import { RiCoinsLine } from '@react-icons/all-files/ri/RiCoinsLine'

const ParticlesTwo = () => {
  const config = {
    background: {
      color: {
        value: '#0d47a1',
      },
      position: '50% 50%',
      repeat: 'no-repeat',
      size: 'cover',
    },
    fullScreen: {
      zIndex: 1,
    },
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onDiv: {
          selectors: '#repulse-div',
          mode: 'repulse',
        },
        onHover: {
          enable: true,
          mode: 'repulse',
          parallax: {
            force: 60,
          },
        },
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40,
        },
        grab: {
          distance: 400,
        },
        slow: {
          factor: 1,
          radius: 0,
        },
      },
    },
    particles: {
      color: {
        value: '#ffffff',
      },
      links: {
        color: {
          value: '#ffffff',
        },
        distance: 150,
        enable: true,
        opacity: 0.4,
        shadow: {
          color: {
            value: 'lime',
          },
        },
      },
      move: {
        attract: {
          rotate: {
            x: 600,
            y: 1200,
          },
        },
        enable: true,
        outModes: {
          bottom: 'out',
          left: 'out',
          right: 'out',
          top: 'out',
        },
      },
      number: {
        density: {
          enable: true,
        },
        value: 80,
      },
      opacity: {
        value: {
          min: 0.1,
          max: 0.5,
        },
        animation: {
          enable: true,
          speed: 1,
          minimumValue: 0.1,
        },
      },
      shape: {
        options: {
          character: [
            {
              fill: true,
              font: 'Font Awesome 5 Brands',
              style: '',
              value: [''],
              weight: '400',
            },
            {
              fill: true,
              font: 'Font Awesome 5 Free',
              style: '',
              value: [''],
              weight: '900',
            },
          ],
          char: [
            {
              fill: true,
              font: 'Font Awesome 5 Brands',
              style: '',
              value: [''],
              weight: '400',
            },
            {
              fill: true,
              font: 'Font Awesome 5 Free',
              style: '',
              value: [''],
              weight: '900',
            },
          ],
          polygon: {
            sides: 5,
          },
          star: {
            sides: 5,
          },
          image: {
            height: 100,
            replaceColor: true,
            src: 'https://particles.js.org/images/github.svg',
            width: 100,
          },
          images: {
            height: 100,
            replaceColor: true,
            src: 'https://particles.js.org/images/github.svg',
            width: 100,
          },
        },
        type: 'char',
      },
      size: {
        value: 16,
        animation: {
          speed: 10,
          minimumValue: 10,
        },
      },
      stroke: {
        width: 1,
        color: {
          value: '#ffffff',
          animation: {
            h: {
              count: 0,
              enable: false,
              offset: 0,
              speed: 1,
              sync: true,
            },
            s: {
              count: 0,
              enable: false,
              offset: 0,
              speed: 1,
              sync: true,
            },
            l: {
              count: 0,
              enable: false,
              offset: 0,
              speed: 1,
              sync: true,
            },
          },
        },
      },
    },
  }

  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: {
            value: '#156a4e',
          },
          position: '50% 50%',
          repeat: 'no-repeat',
          size: 'cover',
        },
        fullScreen: {
          zIndex: 0,
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'push',
            },
            onDiv: {
              selectors: '#repulse-div',
              mode: 'repulse',
            },
            onHover: {
              enable: true,
              mode: 'repulse',
              parallax: {
                force: 60,
              },
            },
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            grab: {
              distance: 400,
            },
            slow: {
              factor: 1,
              radius: 0,
            },
          },
        },
        particles: {
          color: {
            value: '#ffffff',
          },
          links: {
            color: {
              value: '#ffffff',
            },
            distance: 150,
            enable: true,
            opacity: 0.4,
            shadow: {
              color: {
                value: 'lime',
              },
            },
          },
          move: {
            attract: {
              rotate: {
                x: 600,
                y: 1200,
              },
            },
            enable: true,
          },
          number: {
            density: {
              enable: true,
            },
            value: 80,
          },
          opacity: {
            value: {
              min: 0.1,
              max: 0.5,
            },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
            },
          },
          shape: {
            options: {
              character: [
                {
                  fill: true,
                  font: 'Font Awesome 5 Brands',
                  style: '',
                  value: ['N'],
                  weight: '900',
                },
                {
                  fill: true,
                  font: 'Font Awesome 5 Free',
                  style: '',
                  value: ['NF'],
                  weight: '900',
                },
                {
                  fill: true,
                  font: 'Font Awesome 5 Free',
                  style: '',
                  value: ['NFT'],
                  weight: '900',
                },
                {
                  fill: true,
                  font: 'Font Awesome 5 Free',
                  style: '',
                  value: ['FT'],
                  weight: '900',
                },
                {
                  fill: true,
                  font: 'Font Awesome 5 Free',
                  style: '',
                  value: ['F'],
                  weight: '900',
                },
                {
                  fill: true,
                  font: 'Font Awesome 5 Free',
                  style: '',
                  value: ['T'],
                  weight: '900',
                },
              ],

              polygon: {
                sides: 5,
              },
              star: {
                sides: 5,
              },
              image: {
                height: 100,
                replaceColor: true,
                src: 'https://particles.js.org/images/github.svg',
                width: 100,
              },
              images: {
                height: 100,
                replaceColor: true,
                src: 'https://particles.js.org/images/github.svg',
                width: 100,
              },
            },
            type: 'char',
          },
          size: {
            value: 16,
            animation: {
              speed: 10,
              minimumValue: 10,
            },
          },
          stroke: {
            width: 1,
            color: {
              value: '#ffffff',
              animation: {
                h: {
                  count: 0,
                  enable: false,
                  offset: 0,
                  speed: 1,
                  sync: true,
                },
                s: {
                  count: 0,
                  enable: false,
                  offset: 0,
                  speed: 1,
                  sync: true,
                },
                l: {
                  count: 0,
                  enable: false,
                  offset: 0,
                  speed: 1,
                  sync: true,
                },
              },
            },
          },
        },
        detectRetina: true,
      }}
    />
  )
}

export default ParticlesTwo
