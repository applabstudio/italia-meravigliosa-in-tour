import * as React from 'react'
import Image from "next/image"
import { LiFb } from "./styles";
import Link from "next/link"
import { CursorClickIcon, PhotographIcon, StarIcon, ThumbUpIcon, TicketIcon } from '@heroicons/react/outline'


const FacebookSection = () => {

    const alignSelf = {
        alignSelf: "center"
    }

    return (
        <>
            <div className="col-span-12 facebook-mobile" style={{ width: "100%", display: "flex", flexWrap: "wrap", padding: 15}}>
                <div
                    className="facebook_text_grid_width"
                    style={alignSelf}>
                    <p className="text facebook_text text-gray-800">SEGUICI SU FACEBOOK SIAMO OLTRE 250 MILA</p>
                    <div className='facebook-mobile-icon' >
                        <Image
                            src="/images/fb.png"
                            objectFit="contain"
                            layout="intrinsic"
                            width={25}
                            height={25}
                            alt="hand"/>
                        <Link href="https://www.facebook.com/istagram.paoloartista1/">
                            <a style={{ fontSize: 14, color: "#217BF4", paddingLeft: 8}} title='Pagina Facebook'>https://www.facebook.com/istagram.paoloartista1/</a>
                        </Link>
                    </div>
                    <ul style={{ color: "#217BF4", paddingLeft: 18, paddingBottom: 40 }} className="facebook_list">
                        <LiFb>Post spettacolari e unici</LiFb>
                        <LiFb>Community</LiFb>
                        <LiFb>Share</LiFb>
                    </ul>
                </div>

                <div className="facebook_text_grid_width hide_mobile">
                    <div className="grid grid-cols-12">
                        <div
                            className="col-span-7 text-right"
                            style={{ alignSelf: "center" }}>
                            <Image
                                src="/images/card1.jpg"
                                objectFit="contain"
                                layout="intrinsic"
                                width={250}
                                height={300}
                                alt="hand"
                                className="cards"
                            />
                        </div>
                        <div className="col-span-5">
                            <Image
                                src="/images/image2.png"
                                objectFit="contain"
                                layout="intrinsic"
                                width={300}
                                height={300}
                                alt="hand"
                            />
                            <Image
                                src="/images/image3.png"
                                objectFit="contain"
                                layout="intrinsic"
                                width={300}
                                height={300}
                                alt="hand"
                            />
                        </div>
                    </div>
                </div>
                <div className="facebook_text_grid_width view_mobile">
                    <Image
                        src="/images/card1.jpg"
                        objectFit="contain"
                        layout="intrinsic"
                        width={300}
                        height={300}
                        alt="hand"
                    />

                    <Image
                        src="/images/image2.png"
                        objectFit="contain"
                        layout="intrinsic"
                        width={300}
                        height={300}
                        alt="hand"
                    />
                    <Image
                        src="/images/image3.png"
                        objectFit="contain"
                        layout="intrinsic"
                        width={300}
                        height={300}
                        alt="hand"
                    />
                </div>
            </div>
            <div className="col-span-12 box-border flex flex-col xl:col-span-12" >
                <div className="xl:col-span-5" style={{ alignSelf: "center", background: "red" }}></div>
                <div className="xl:col-span-6"></div>
            </div>
            <div className="col-span-12 box-border flex flex-col px-4 xl:col-span-12">
                <p className="user-active text-center text-gray-800" style={{ fontWeight: "700", fontSize: 80 }}>
                    1M+ Utenti Giornalieri
                </p>
            </div>
            <div className="col-span-12 box-border flex flex-col px-4 xl:col-span-12">
                <div className="grid grid-cols-2  md:grid-cols-3 xl:grid-cols-12">
                    <div className="infoBox xl:col-span-3" style={{ borderLeft: "none" }}>
                        <PhotographIcon className='text-blue-500' width={30} height={30}/>
                        <p className="infoGray text-center">FOTO</p>
                        <p className="text-center text-blue-500">+50K</p>
                    </div>
                    <div className="infoBox xl:col-span-3">
                        <ThumbUpIcon className='text-blue-500' width={30} height={30}/>
                        <p className="infoGray text-center">INTERAZIONI</p>
                        <p className="text-center text-blue-500">+15M</p>
                    </div>
                    <div className="infoBox xl:col-span-3">
                        <TicketIcon className='text-blue-500' width={30} height={30}/>
                        <p className="infoGray text-center" style={{ width: "50%" }}>LUOGHI MERAVIGLIOSI</p>
                        <p className="text-center text-blue-500">+1000</p>
                    </div>
                    <div className="infoBox xl:col-span-3" style={{ borderRight: "none" }}>
                        <StarIcon className='text-blue-500' width={30} height={30}/>
                        <p className="infoGray text-center">COLLABORAZIONI</p>
                        <p className="text-center text-blue-500">+50</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FacebookSection