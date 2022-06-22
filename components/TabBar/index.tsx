import React, { useState } from 'react'
import Image from "next/image"
import Link from "next/link"

export default function Tabbar() {


    const [homeHover, setHomeHover] = useState<any>("home")
    const [infoHover, setInfoHover] = useState<any>("info")
    const [workHover, setWorkHover] = useState<any>("work")
    const [heartHover, setHeartHover] = useState<any>("heart")
    const [searchHover, setSearchHover] = useState<any>("search")
    return (


        <div
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "#fff"
            }}
            className="col-span-12 box-border flex flex-col px-4 xl:col-span-12 botton_navbar">
            <div
                className="footer-grid xl:col-span-2"
                style={{ borderLeft: "none" }}
                onMouseEnter={
                    () => {
                        setHomeHover("home_hover")
                    }
                }
                onMouseLeave={
                    () => {
                        setHomeHover("home")
                    }
                }
            >

                <Image
                    src={`/images/${homeHover}.png`}
                    objectFit="contain"
                    layout="intrinsic"
                    width={34}
                    height={34}
                    alt="home"
                    className="homeIcon"
                />
                <p className="text-center tabText">
                    Home
                </p>
            </div>

            <Link href="/#who-we-are-section">
                <a>
                    <div className="footer-grid xl:col-span-3"
                        onMouseEnter={
                            () => {
                                setInfoHover("info_hover")
                            }
                        }
                        onMouseLeave={
                            () => {
                                setInfoHover("info")
                            }
                        }
                    >
                        <Image
                            src={`/images/${infoHover}.png`}
                            objectFit="contain"
                            layout="intrinsic"
                            width={34}
                            height={34}
                            alt="info"
                            className="infoIcon"
                        />
                        <p className="text-center tabText">Chi siamo</p>
                    </div>
                </a>
            </Link>

            <Link href="/#work-with-us-section">
                <a>
                    <div className="footer-grid xl:col-span-3"
                        onMouseEnter={
                            () => {
                                setWorkHover("work_hover")
                            }
                        }
                        onMouseLeave={
                            () => {
                                setWorkHover("work")
                            }
                        }
                    >
                        <Image
                            src={`/images/${workHover}.png`}
                            objectFit="contain"
                            layout="intrinsic"
                            width={34}
                            height={34}
                            alt="work"
                            className="workIcon"
                        />
                        <p className="text-center tabText">Lavora con noi</p>
                    </div>
                </a>
            </Link>

            <Link href="/#wish-list-section" >
                <a>

                    <div className="footer-grid xl:col-span-2"
                        onMouseEnter={
                            () => {
                                setHeartHover("heart_hover")
                            }
                        }
                        onMouseLeave={
                            () => {
                                setHeartHover("heart")
                            }
                        }
                    >
                        <Image
                            src={`/images/${heartHover}.png`}
                            objectFit="contain"
                            layout="intrinsic"
                            width={34}
                            height={34}
                            alt="heart"
                            className="heartIcon"
                        />
                        <p className="text-center tabText">Wishlist</p>
                    </div>
                </a>
            </Link>

            <Link href="/#top-section">
                <a>
                    <div className="footer-grid xl:col-span-2"
                        onMouseEnter={
                            () => {
                                setSearchHover("search_hover")
                            }
                        }
                        onMouseLeave={
                            () => {
                                setSearchHover("search")
                            }
                        }
                    >
                        <Image
                            src={`/images/${searchHover}.png`}
                            objectFit="contain"
                            layout="intrinsic"
                            width={34}
                            height={34}
                            alt="search"
                            className="searchIcon"
                        />
                        <p className="text-center tabText">Cerca</p>
                    </div>

                </a>
            </Link>
        </div>

    )
}
