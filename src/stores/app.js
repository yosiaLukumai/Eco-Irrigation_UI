import { create } from "zustand"


const MainAppStore = create((set) => ({
    BackDropFlag: false,
    NotificationFlag: false,
    NotificationMessage: "",
    NotificationType: "success",
    setNotificationOn: (type = "success", msg = "message") => set((state) => ({ NotificationMessage: msg, NotificationType: type, NotificationFlag: true })),
    setNotificationOff: () => set({ NotificationFlag: false }),
    setBackDropFlagOn: () => set((state) => ({ BackDropFlag: true })),
    setBackDropFlagOff: () => set({ BackDropFlag: false }),

    // data for various store definations



    // reset the zustand stor
    // resetStore: () => set(() => set(void)),
}))

export default MainAppStore