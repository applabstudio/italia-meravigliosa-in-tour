import React from 'react'
import { FaArrowCircleRight, FaEnvelope } from "react-icons/fa"


const Newsletter = () => {
  
    return (
        <div
            id="wish-list-section"
            className="col-span-12 px-4"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <div
              style={{
                width: "95%",
                padding: 5,
                borderRadius: 40,
                backgroundImage: 'url("/images/gradient.png")',
                backgroundSize: "cover",
              }}>
              <p
                className="text-center"
                style={{
                  fontSize: 40,
                  paddingTop: 50,
                  paddingBottom: 10,
                  fontWeight: "600",
                  color: "white",
                }}>
                Vuoi ricevere piu’ informazioni?
              </p>
              <p
                className="text-center"
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: "white",
                }}>
                Iscriviti alla newsletter di italia meravigliosa
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  paddingBottom: 40,
                }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "white",
                    borderRadius: 50,
                    height: 40,
                    paddingLeft: 15,
                    border: "1px solid white"
                  }}
                  className="input-newsletter">
                  <FaEnvelope color="gray" />{" "}
                  <input
                    placeholder="La tua email"
                    style={{ border: "none", width: "80%", marginLeft: 5, }}
                  ></input>
                </div>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 20,
                    background: "#231A36",
                  }}
                  className="rounded-full bg-red-500 py-2 px-6 font-bold text-white hover:bg-red-700 buttonNewsletter"
                >
                  <span style={{ marginRight: 5 }}>Iscriviti</span>{" "}
                  <FaArrowCircleRight />
                </button>
              </div>
            </div>
          </div>
    )
  };

export default Newsletter