import * as React from 'react'
import Image from "next/image"
import {LiFb} from "./styles";
import Link from "next/link"


const FacebookSection = () => {

    return (
              <>
                <div
                className="col-span-12"
                style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
        
                    <div
                    className="facebook_text_grid_width"
                    style={{ alignSelf: "center" }}
                    >
                    <p className="text facebook_text">
                        SEGUICI SU FACEBOOK, SIAMO OLTRE 250 MILA
                    </p>
                    <div style={{ display: "flex", paddingBottom: 40, paddingTop: 40 }}>
                        <Image
                            src="/images/fb.png"
                            objectFit="contain"
                            layout="intrinsic"
                            width={25}
                            height={25}
                            alt="hand"
                        />
                     
                        <Link href="https://www.facebook.com/istagram.paoloartista1/">
                            <a style={{ fontSize: 16, color: "#217BF4", paddingLeft: 8}} title='Pagina Facebook'>https://www.facebook.com/istagram.paoloartista1/</a>
                        </Link>
                        
                    </div>
                    <ul style={{ listStyleType: "circle", color: "#217BF4", paddingLeft: 18, paddingBottom: 40 }} className="facebook_list">
                       <LiFb><li>Post spettacolari e unici</li></LiFb>
                       <LiFb><li>Community</li></LiFb>
                       <LiFb><li>Share</li></LiFb>
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
            </div>.
            <div className="col-span-12 box-border flex flex-col xl:col-span-12" >
                <div
                className="xl:col-span-5"
                style={{ alignSelf: "center", background: "red" }}
                ></div>
                <div className="xl:col-span-6"></div>
            </div>
            <div className="col-span-12 box-border flex flex-col px-4 xl:col-span-12">
                <p
                className="user-active text-center"
                style={{ fontWeight: "700", fontSize: 80 }}>
                1M+ Utenti Giornalieri
                </p>
            </div>
            <div className="col-span-12 box-border flex flex-col px-4 xl:col-span-12">
                <div className="grid grid-cols-2  md:grid-cols-3 xl:grid-cols-12">
                <div
                    className="infoBox xl:col-span-3"
                    style={{ borderLeft: "none" }}>
                    <p className="infoGray text-center">FOTO</p>
                    <p className="text-center">+50K</p>
                </div>
                <div className="infoBox xl:col-span-3">
                    <p className="infoGray text-center">INTERAZIONI</p>
                    <p className="text-center">+15M</p>
                </div>
                <div className="infoBox xl:col-span-3">
                    <p className="infoGray text-center" style={{ width: "50%" }}>
                    LUOGHI MERAVIGLIOSI
                    </p>
                    <p className="text-center">+1000</p>
                </div>
                <div
                    className="infoBox xl:col-span-3"
                    style={{ borderRight: "none" }}>
                    <p className="infoGray text-center">COLLABORAZIONI</p>
                    <p className="text-center">+50</p>
                </div>
                </div>
            </div>
    </>
    )
}

export default FacebookSection