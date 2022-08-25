import styled from "styled-components"
import { FaHeart, FaUser, FaDoorOpen, FaDownload } from "react-icons/fa"
import { useState, useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth, logout } from "../firebase/clientApp"
import SearchBar from "./common/SearchBar"
import WishModal from "./WishModal"
import ThemeToggle from "./ThemeToggle"
import Link from "next/link"

import MagicBell, {
  FloatingNotificationInbox,
} from "@magicbell/magicbell-react"

const theme = {
  icon: { borderColor: "#ef4444", width: "24px" },
  unseenBadge: { backgroundColor: "#ef4444" },
  header: {
    backgroundColor: "#10b981",
    textColor: "#ffffff",
    borderRadius: "16px",
    fontFamily: "inherit",
  },
  footer: {
    backgroundColor: "#10b981",
    textColor: "#ffffff",
    borderRadius: "16px",
    fontFamily: "inherit",
  },
  notification: {
    default: {
      textColor: "#27272a",
      borderRadius: "8px",
      backgroundColor: "#10b981",
      fontFamily: "inherit",
    },
    unseen: {
      backgroundColor: "#10b981",
      textColor: "#27272a",
      borderRadius: "8px",
      fontFamily: "inherit",
    },
    unread: {
      backgroundColor: "#10b981",
      textColor: "#27272a",
      borderRadius: "8px",
      fontFamily: "inherit",
    },
  },
}

const MobileMenu: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [user, loading, error] = useAuthState(auth)
  const [userOpen, setUserOpen] = useState(false)

  return (
    <MobileNav style={{ left: isOpen ? 0 : "-100%" }}>
      <div className="mt-3 mb-3 flex justify-between">
        <div className="relative flex items-center space-x-6">
          <button
            type="button"
            aria-hidden="true"
            onClick={() => setModalOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-secondary-500 outline-none ring-secondary-200 transition duration-200 hover:bg-secondary-100 focus:ring-2"
          >
            <FaHeart className="text-secondary-500" size={20} />
          </button>

          {user && user?.email && (
            <MagicBell
              apiKey="97576655a4d3dd3e0a7ee53354b21e333fe580ed"
              userEmail={user.email}
              theme={theme}
              locale="en"
            >
              {(props) => (
                <FloatingNotificationInbox
                  width={400}
                  height={500}
                  {...props}
                />
              )}
            </MagicBell>
          )}

          {user && (
            <>
              <div
                onClick={() => setUserOpen(!userOpen)}
                className="flex cursor-pointer items-center space-x-2 whitespace-nowrap rounded-full bg-primary-100 py-3 px-4 font-medium text-primary-700"
              >
                <FaUser />
                <span>{user?.displayName}</span>
              </div>

              {userOpen && (
                <div className="userLogout absolute right-0 top-20 !z-50 rounded-xl p-8 shadow-xl">
                  <p className="text-lg font-medium">{user?.email}</p>

                  <br />

                  <div
                    onClick={() => {
                      logout()
                    }}
                    className="flex cursor-pointer items-center justify-center space-x-4 rounded-full bg-secondary-100 px-4 py-3 text-lg font-medium text-secondary-500"
                  >
                    <FaDoorOpen />
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <WishModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        <ThemeToggle />
      </div>
      <SearchBar />

      <div className="grid w-full place-items-center">
        <Link href="/servizi.pdf" target="_blank" download>
          <a className="wrapperUsername wrapperUsername3 mt-6 block w-full text-black">
            <FaDownload />
            Servizi
          </a>
        </Link>
      </div>
    </MobileNav>
  )
}

export default MobileMenu

const MobileNav = styled.div`
  position: fixed;
  z-index: 1;
  transition: left 0.8s ease-in-out;
  width: 100%;
  background-color: white;
  height: calc(100vh - 160px);
  border-bottom: 1px solid gray;
  padding: 10px;
`
