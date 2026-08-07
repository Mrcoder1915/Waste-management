import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Activity,
  Cpu,
  Camera,
  Grip,
  House,
  Octagon,
  Maximize,
  Minimize,
  Trash2,
  LucideIcon,
} from "lucide-react";
import DashboardLayout from "../components/layouts/dashbord";
import Topbar from "../components/Topbar";
import { Panel } from "../components/panel";
import { Button } from "../components/catalyst/button";
import { StatCard } from "../components/catalyst/card";
import { Badge } from "../components/catalyst/badge";
import { IconAction } from "../components/catalyst/icon";
import { Subheading } from "../components/catalyst/heading";
import { Tone } from "../lib/tone-style";

interface JointControl {
  name: string;
  neg: { label: string; icon: LucideIcon };
  pos: { label: string; icon: LucideIcon };
}

const JOINTS: JointControl[] = [
  {
    name: "Base Rotation",
    neg: { label: "Left", icon: ArrowLeft },
    pos: { label: "Right", icon: ArrowRight },
  },
  {
    name: "Shoulder",
    neg: { label: "Up", icon: ArrowUp },
    pos: { label: "Down", icon: ArrowDown },
  },
  {
    name: "Elbow",
    neg: { label: "Up", icon: ArrowUp },
    pos: { label: "Down", icon: ArrowDown },
  },
  {
    name: "Wrist Rotation",
    neg: { label: "Left", icon: ArrowLeft },
    pos: { label: "Right", icon: ArrowRight },
  },
];

const COORDINATES: { axis: string; value: number; tone: Tone }[] = [
  { axis: "X", value: 140, tone: "blue" },
  { axis: "Y", value: 310, tone: "green" },
  { axis: "Z", value: 120, tone: "purple" },
];

export default function SegregationPage() {
  const [speed, setSpeed] = useState(50);
  const [mode, setMode] = useState<"manual" | "auto">("manual");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const cameraRef = useRef<HTMLDivElement>(null);

  const isAuto = mode === "auto";

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      cameraRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const logs = [
    "Detected: Paper Box",
    "Detected: Plastic Bottle",
    "Arm moving... Success",
    "Detected: Metal Can",
    "Sorting complete",
  ];

  return (
    <DashboardLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <Topbar
          title="Segregation"
          subtitle="Monitor and control the waste segregation process."
        />

        {/* STATUS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard
            icon={Activity}
            tone="green"
            label="System"
            value="Running"
            sub="Segregation active"
          />
          <StatCard
            icon={Cpu}
            tone="blue"
            label="Controller"
            value="ESP32 Connected"
            sub="Serial link stable"
          />
          <StatCard
            icon={Grip}
            tone="amber"
            label="Gripper"
            value="Idle"
            sub="Awaiting command"
          />
        </div>

        {/* CAMERA FEED WITH OVERLAID CONTROLS */}
        <Subheading className="mb-3">Base Segregation Camera</Subheading>
        <div
          ref={cameraRef}
          className="relative h-72 sm:h-96 lg:h-160 bg-gray-900 rounded-lg overflow-hidden mb-5"
        >
          {/* Camera placeholder background */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 ">
            <Camera className="size-12 mb-2" />
            <p className="text-sm">Camera feed unavailable</p>
            <p className="text-xs text-gray-600">
              Base segregation stream will appear here
            </p>
          </div>

          {/* TOP BAR: LIVE + speed + fullscreen */}
          <div className="absolute top-0 inset-x-0 flex items-start justify-between p-4 gap-3">
            <div className="flex items-center gap-2">
              <Badge tone="red" dot>
                LIVE
              </Badge>

              <div className="hidden lg:inline-flex gap-1 bg-black/25 backdrop-blur-sm rounded-lg p-1">
                <Button
                  variant={mode === "manual" ? "primary" : "glass"}
                  className="px-3! py-1! text-xs!"
                  onClick={() => setMode("manual")}
                >
                  Manual
                </Button>
                <Button
                  variant={mode === "auto" ? "primary" : "glass"}
                  className="px-3! py-1! text-xs!"
                  onClick={() => setMode("auto")}
                >
                  Auto
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="hidden lg:block w-48 bg-black/25 backdrop-blur-sm rounded-lg px-3 py-2 text-white">
                <div className="flex justify-between text-xs mb-1">
                  <label htmlFor="speed">Speed</label>
                  <span className="font-semibold text-emerald-300">
                    {speed}
                  </span>
                </div>
                <input
                  id="speed"
                  type="range"
                  min={1}
                  max={100}
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <button
                onClick={toggleFullscreen}
                aria-label={
                  isFullscreen ? "Exit fullscreen" : "Enter fullscreen"
                }
                className="flex items-center justify-center size-10 rounded-lg bg-white/10 border border-white/25 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              >
                {isFullscreen ? (
                  <Minimize className="size-4.5" />
                ) : (
                  <Maximize className="size-4.5" />
                )}
              </button>
            </div>
          </div>

          {/* LEFT CLUSTER: joint controls (desktop overlay) */}
          <div className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 w-56 space-y-2.5 p-1">
            {JOINTS.map((joint) => {
              const NegIcon = joint.neg.icon;
              const PosIcon = joint.pos.icon;
              return (
                <div key={joint.name}>
                  <p className="text-[11px] font-medium text-white/80 mb-1 drop-shadow">
                    {joint.name}
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    <Button
                      variant="glass"
                      disabled={isAuto}
                      className="w-full disabled:opacity-40 disabled:pointer-events-none"
                    >
                      <NegIcon className="size-4" />
                      {joint.neg.label}
                    </Button>
                    <Button
                      variant="glass"
                      disabled={isAuto}
                      className="w-full disabled:opacity-40 disabled:pointer-events-none"
                    >
                      {joint.pos.label}
                      <PosIcon className="size-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT CLUSTER: gripper / home / stop (desktop overlay) */}
          <div className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 w-44 space-y-2 p-1">
            <Button
              variant="glass"
              disabled={isAuto}
              className="w-full disabled:opacity-40 disabled:pointer-events-none"
            >
              <Grip className="size-4" />
              Gripper
            </Button>
            <Button
              variant="glass"
              disabled={isAuto}
              className="w-full disabled:opacity-40 disabled:pointer-events-none"
            >
              <House className="size-4" />
              Home
            </Button>
            <Button variant="glass-danger" className="w-full">
              <Octagon className="size-4" />
              Stop
            </Button>
          </div>
        </div>

        {/* MOBILE CONTROLS (stacked below the video) */}
        <div className="lg:hidden mb-6">
          <Panel title="">
            <div className="flex items-center justify-between mb-4">
              <Subheading>Controls</Subheading>
              <div className="inline-flex gap-1 bg-slate-100 rounded-lg p-1">
                <Button
                  variant={mode === "manual" ? "primary" : "soft-emerald"}
                  className="px-3! py-1! text-xs!"
                  onClick={() => setMode("manual")}
                >
                  Manual
                </Button>
                <Button
                  variant={mode === "auto" ? "primary" : "soft-emerald"}
                  className="px-3! py-1! text-xs!"
                  onClick={() => setMode("auto")}
                >
                  Auto
                </Button>
              </div>
            </div>

            <div className="mb-4 rounded-lg bg-slate-50 px-3 py-2">
              <div className="flex justify-between text-xs mb-1 text-slate-600">
                <label htmlFor="speed-mobile">Speed</label>
                <span className="font-semibold text-emerald-600">{speed}</span>
              </div>
              <input
                id="speed-mobile"
                type="range"
                min={1}
                max={100}
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {JOINTS.map((joint) => {
                const NegIcon = joint.neg.icon;
                const PosIcon = joint.pos.icon;
                return (
                  <div key={joint.name}>
                    <p className="text-xs font-medium text-slate-500 mb-1">
                      {joint.name}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="soft-emerald"
                        disabled={isAuto}
                        className="w-full disabled:opacity-40 disabled:pointer-events-none"
                      >
                        <NegIcon className="size-4" />
                        {joint.neg.label}
                      </Button>
                      <Button
                        variant="soft-emerald"
                        disabled={isAuto}
                        className="w-full disabled:opacity-40 disabled:pointer-events-none"
                      >
                        {joint.pos.label}
                        <PosIcon className="size-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3">
              <Button
                variant="soft-emerald"
                disabled={isAuto}
                className="w-full disabled:opacity-40 disabled:pointer-events-none"
              >
                <Grip className="size-4" />
                Gripper
              </Button>
              <Button
                variant="soft-emerald"
                disabled={isAuto}
                className="w-full disabled:opacity-40 disabled:pointer-events-none"
              >
                <House className="size-4" />
                Home
              </Button>
              <Button variant="destructive" className="w-full col-span-2">
                <Octagon className="size-4" />
                Stop
              </Button>
            </div>
          </Panel>
        </div>

        {/* LOGS + COORDINATES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Panel title="">
            <div className="flex items-center justify-between mb-4">
              <Subheading>Activity Log</Subheading>
              <IconAction tone="red" aria-label="Clear log">
                <Trash2 className="size-3.5" />
              </IconAction>
            </div>
            <div className="h-64 overflow-y-auto border border-slate-100 rounded-lg p-2">
              {logs.map((log, index) => (
                <div
                  key={index}
                  className="text-sm border-b border-slate-100 last:border-0 py-1 text-slate-600"
                >
                  [{new Date().toLocaleTimeString()}] {log}
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="">
            <Subheading className="mb-4">Coordinates</Subheading>
            <div className="grid grid-cols-3 gap-3">
              {COORDINATES.map((c) => (
                <div
                  key={c.axis}
                  className="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 py-4"
                >
                  <Badge tone={c.tone}>{c.axis}</Badge>
                  <span className="text-xl font-semibold text-slate-900">
                    {c.value}
                  </span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </DashboardLayout>
  );
}
