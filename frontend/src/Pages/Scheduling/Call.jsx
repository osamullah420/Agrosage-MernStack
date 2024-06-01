import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useAuth } from "../../context/AuthProvider";

const Call = () => {
  const [auth] = useAuth();
  const { scheduleId } = useParams();

  const myMeeting = async (element) => {
    const appID = 1686301790;
    const serverSecret = "f65fe8304e0639820f6a11336ddd9937";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      scheduleId,
      Date.now().toString(),
      auth?.user?.name
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: false,
    });
  };
  return (
    <div>
      {" "}
      <div className="flex items-center justify-between m-4 ">
        <div ref={myMeeting} />
      </div>
    </div>
  );
};

export default Call;
