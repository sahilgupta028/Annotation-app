/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CanvasStage from "../../components/CanvasStage";

export default function CanvasPage() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/");
  }, []);

  return (
    <>
      <CanvasStage />
    </>
  );
}
