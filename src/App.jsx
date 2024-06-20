import { useState } from "react"
import BackdropProcess from "./components/Backdrop"
import Landing from "./layout/landing"
import MainAppStore from "./stores/app"
import AlertDialog from "./Utils/Alerts"

function App() {

  const onSending = MainAppStore((state) => state.BackDropFlag)
  const msgs = MainAppStore((state) => state.NotificationMessage)
  let typeMessage = MainAppStore((state) => state.NotificationType)
  const showFlag = MainAppStore((state) =>state.NotificationFlag)
  const setNotificationOff = MainAppStore((state) =>state.setNotificationOff)

  const NotifyParent = () => {
    setNotificationOff()
  }
  return (
    <>
      <div >
        <BackdropProcess opens={onSending} />
        <AlertDialog msg={msgs} time={2000} type={typeMessage} show={showFlag} NotifyParent={NotifyParent} />
        <Landing />
      </div>

    </>
  )
}

export default App
