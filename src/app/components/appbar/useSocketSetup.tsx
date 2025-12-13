import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { notificationsSliceActions } from "../sessions/sessionNotification";
// import { dialoguesSliceActions } from "../sessions/sessionDialogues";
// import { getUserGenericConfig, userConfigSliceActions } from "../sessions/sessionConfig/sessionUserConfigurations";
import { AppDispatch, RootState } from "../../store";

const useSocketSetup = (socket: any) => {
  const currentUser = useSelector((state: RootState) => state.session.currentUser);
  const authHeaders = useSelector((state: RootState) => state.session.authHeaders);
  const dispatch = useDispatch<AppDispatch>();

  // async function refreshToolBarInfo(){
  //   await dispatch(userConfigSliceActions.incrementNotificationsLength());
  // }

  // useEffect(() => {
  //   socket.connect();

  //   socket.on("connect", () => {
  //     return
  //   });

  //   if (currentUser?.id ) {
  //     const notificationEvent = `notification:recipient:${currentUser.id}`;
  //     const dialogueMessageEvent = `dialogue_message:recipient:${currentUser.id}`;

  //     socket.on(notificationEvent, (message: any) => {
  //       try {
  //         const parsedMessage = JSON.parse(message);
  //         dispatch(notificationsSliceActions.incrementNotifications(parsedMessage));
  //         dispatch(userConfigSliceActions.incrementNotificationsLength());
          
  //       } catch (error) {
  //         console.error("Failed to process notification message:", error);
  //       }
  //     });

  //     socket.on(dialogueMessageEvent, (message: any) => {
  //       try {
  //         if (authHeaders && currentUser?.nickname){
  //           const parsedMessage = JSON.parse(message);
  //           dispatch(dialoguesSliceActions.incrementListenedDialogue(parsedMessage));
  //           dispatch(getUserGenericConfig({
  //                                           authHeaders,
  //                                           userNickname: currentUser.nickname,
  //                                         }))
  //         }
          
  //       } catch (error) {
  //         console.error("Failed to process dialogue message:", error);
  //       }
  //     });

//       return () => {
//         socket.off(notificationEvent);
//         socket.off(dialogueMessageEvent);
//       };
//     }

//     return () => {
//       socket.off("connect");
//       socket.disconnect();
//     };
//   }, [socket, dispatch, currentUser]);
};

export default useSocketSetup;
