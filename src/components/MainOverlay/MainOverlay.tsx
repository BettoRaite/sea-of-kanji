import { BottomMenu } from "../BottomMenu/BottomMenu";
import { SavedOverlay } from "../SavedOverlay/SavedOverlay";
import { useState } from "react";

export function MainOverlay() {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <>
      <SavedOverlay isHidden={!showOverlay} />
      <BottomMenu
        onShowOverlay={() => {
          setShowOverlay(!showOverlay);
        }}
      />
    </>
  );
}
