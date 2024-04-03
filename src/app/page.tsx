import Image from "next/image";
import TypewriterTitle from "@/components/TypewriterTitle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-teal-500 min-h-screen grain">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-7xl text-center">
          AI
          <span className="text-green-600 font-extrabold"> note taking </span>
          assistant.
        </h1>
        <h2 className="font-semibold text-center text-3xl text-slate-700 mt-4">
          <TypewriterTitle />
        </h2>
        <div className="flex justify-center mt-4">
          <Link href="/dashboard">
            <Button className="bg-green-600">
              Get Started{" "}
              <ArrowRight className="ml-2 w-5 h-5 strokeWidth={3}" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
