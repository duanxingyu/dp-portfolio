export function ImageWatermark({ text }: { text: string }) {
  return (
    <div
      className="image-watermark-corner pointer-events-none absolute right-3 bottom-3 z-[3] px-2.5 py-1 text-[11px]"
      aria-hidden
    >
      {text}
    </div>
  );
}
