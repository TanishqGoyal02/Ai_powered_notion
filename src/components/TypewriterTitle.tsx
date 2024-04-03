"use client";
import React from "react";
import Typewriter from "typewriter-effect";

type props = {};

const TypewriterTitle = (props: props) => {
  return (
    <Typewriter
      options={{ loop: true }}
      onInit={(typewriter) => {
        typewriter
          .typeString("😄 Supercharge your productivity.")
          .pauseFor(1000)
          .deleteAll()
          .typeString("🦾 AI Autofill feature.")
          .start();
      }}
    />
  );
};
export default TypewriterTitle;
