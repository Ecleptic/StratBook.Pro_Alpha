/* eslint-disable */
import React from 'react'

const HeroImage = ({ hero }) => {
    switch (hero.toLowerCase()) {
        case 'ana':
            return <img src={AnaPixel} alt="AnaPixel" className="heroIcon" />
        case 'ashe':
            return <img src={AshePixel} alt="AshePixel" className="heroIcon" />
        case 'brigitte': {
            return (
                <img
                    src={BrigittePixel}
                    alt="brigittePixel"
                    className="heroIcon"
                />
            )
        }
        case 'bastion': {
            return (
                <img
                    src={BastionPixel}
                    alt="BastionPixel"
                    className="heroIcon"
                />
            )
        }
        case 'doomfist': {
            return (
                <img
                    src={DoomfistPixel}
                    alt="DoomfistPixel"
                    className="heroIcon"
                />
            )
        }
        case 'dva': {
            return <img src={DvaPixel} alt="DvaPixel" className="heroIcon" />
        }
        case 'genji': {
            return (
                <img src={GenjiPixel} alt="GenjiPixel" className="heroIcon" />
            )
        }
        case 'hanzo': {
            return (
                <img src={HanzoPixel} alt="HanzoPixel" className="heroIcon" />
            )
        }
        case 'junkrat': {
            return (
                <img
                    src={JunkratPixel}
                    alt="JunkratPixel"
                    className="heroIcon"
                />
            )
        }
        case 'lucio': {
            return (
                <img src={LucioPixel} alt="LucioPixel" className="heroIcon" />
            )
        }
        case 'mccree': {
            return (
                <img src={McCreePixel} alt="McCreePixel" className="heroIcon" />
            )
        }
        case 'mei': {
            return <img src={MeiPixel} alt="MeiPixel" className="heroIcon" />
        }
        case 'mercy': {
            return (
                <img src={MercyPixel} alt="MercyPixel" className="heroIcon" />
            )
        }
        case 'moira': {
            return (
                <img src={MoiraPixel} alt="MoiraPixel" className="heroIcon" />
            )
        }
        case 'orisa': {
            return (
                <img src={OrisaPixel} alt="OrisaPixel" className="heroIcon" />
            )
        }
        case 'pharah': {
            return (
                <img src={PharahPixel} alt="PharahPixel" className="heroIcon" />
            )
        }
        case 'reaper': {
            return (
                <img src={ReaperPixel} alt="ReaperPixel" className="heroIcon" />
            )
        }
        case 'reinhardt': {
            return (
                <img
                    src={ReinhardtPixel}
                    alt="ReinhardtPixel"
                    className="heroIcon"
                />
            )
        }
        case 'roadhog': {
            return (
                <img
                    src={RoadhogPixel}
                    alt="RoadhogPixel"
                    className="heroIcon"
                />
            )
        }
        case 'soldier_76': {
            return (
                <img
                    src={Soldier_76Pixel}
                    alt="Soldier_76Pixel"
                    className="heroIcon"
                />
            )
        }
        case 'sombra': {
            return (
                <img src={SombraPixel} alt="SombraPixel" className="heroIcon" />
            )
        }
        case 'symmetra': {
            return (
                <img
                    src={SymmetraPixel}
                    alt="SymmetraPixel"
                    className="heroIcon"
                />
            )
        }
        case 'torbjorn': {
            return (
                <img
                    src={TorbjornPixel}
                    alt="TorbjornPixel"
                    className="heroIcon"
                />
            )
        }
        case 'tracer': {
            return (
                <img src={TracerPixel} alt="TracerPixel" className="heroIcon" />
            )
        }
        case 'widowmaker': {
            return (
                <img
                    src={WidowmakerPixel}
                    alt="WidowmakerPixel"
                    className="heroIcon"
                />
            )
        }
        case 'winston': {
            return (
                <img
                    src={WinstonPixel}
                    alt="WinstonPixel"
                    className="heroIcon"
                />
            )
        }
        case 'wrecking_ball': {
            return (
                <img
                    src={Wrecking_BallPixel}
                    alt="Wrecking_BallPixel"
                    className="heroIcon"
                />
            )
        }
        case 'zarya': {
            return (
                <img src={ZaryaPixel} alt="ZaryaPixel" className="heroIcon" />
            )
        }
        case 'zenyatta': {
            return (
                <img
                    src={ZenyattaPixel}
                    alt="ZenyattaPixel"
                    className="heroIcon"
                />
            )
        }

        default:
            return <p>{hero} Image</p>
    }
}

export default HeroImage

import AnaPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Ana_Pixel.png'
import AshePixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466351/OW_Hero_Pixel_Spray/Spray_Ashe_Pixel.png'
import BastionPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Bastion_Pixel.png'
import DvaPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Dva_Pixel.png'
import GenjiPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Genji_Pixel.png'
import HanzoPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Hanzo_Pixel.png'
import JunkratPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Junkrat_Pixel.png'
import LucioPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Lucio_Pixel.png'
import McCreePixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_McCree_Pixel.png'
import MeiPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Mei_Pixel.png'
import MercyPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Mercy_Pixel.png'
import MoiraPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Moira_Pixel.png'
import OrisaPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Orisa_Pixel.png'
import PharahPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Pharah_Pixel.png'
import ReaperPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Reaper_Pixel.png'
import ReinhardtPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Reinhardt_Pixel.png'
import RoadhogPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Roadhog_Pixel.png'
import Soldier_76Pixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Soldier_76_Pixel.png'
import SombraPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Sombra_Pixel.png'
import SymmetraPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Symmetra_Pixel.png'
import TorbjornPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Torbjorn_Pixel.png'
import TracerPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Tracer_Pixel.png'
import WidowmakerPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Widowmaker_Pixel.png'
import WinstonPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Winston_Pixel.png'
import Wrecking_BallPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466352/OW_Hero_Pixel_Spray/Spray_Wrecking_Ball_Pixel.png'
import ZaryaPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Zarya_Pixel.png'
import ZenyattaPixel from 'https://res.cloudinary.com/ecleptic/image/upload/v1543466363/OW_Hero_Pixel_Spray/Spray_Zenyatta_Pixel.png'
