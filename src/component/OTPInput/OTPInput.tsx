import React, { KeyboardEvent } from "react";
import Styles from './otpInput.module.css'; // remove this line if you are using react

interface OTPInputProps {
  id: string;
  previousId: any;
  nextId: string;
  value: string;
  onValueChange: (id: string, value: string) => void;
  handleSubmit: () => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ id, previousId, nextId, value, onValueChange, handleSubmit }) => {
  // This callback function only runs when a key is released
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    // check if key is backspace or arrowleft
    if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
      // find the previous element
      const prev = document.getElementById(previousId);
      if (prev) {
        // select the previous element
        (prev as HTMLInputElement).select();
      }
    } else if (
      (e.key >= '0' && e.key <= '9') || // check if key is numeric keys 0 to 9
    //   (e.key >= 'A' && e.key <= 'Z') || // check if key is alphabetical keys A to Z
      (e.key >= '0' && e.key <= '9') || // check if key is numeric keypad keys 0 to 9
      e.key === 'ArrowRight' // check if key is right arrow key
    ) {
      // find the next element
      const next = document.getElementById(nextId);
      if (next) {
        // select the next element
        (next as HTMLInputElement).select();
      } else {
        // check if inputGroup has autoSubmit enabled
        const inputGroup = document.getElementById('OTPInputGroup');
        if (inputGroup && inputGroup.dataset['autosubmit']) {
          // submit the form
          handleSubmit();
        }
      }
    }
  };

  return (
    <input
      id={id}
      name={id}
      type="number"
      className={Styles.DigitInput}
      value={value}
      maxLength={1}
      onChange={(e) => onValueChange(id, e.target.value)}
      onKeyUp={handleKeyUp}
    />
  );
};

export default OTPInput;
