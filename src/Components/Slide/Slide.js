import { createApi } from "unsplash-js";
import { useEffect, useState } from "react";

export default function Slide({ slide }) {
  return (
    slide && (
      <div className="w-full max-w-full h-full shadow-lg p-10">
        <h1 className="text-2xl font-bold">{slide.title}</h1>
        <hr />
        <div className="flex grow-0">
          <ul className="list-disc w-full shrink flex flex-col gap-2 mt-5 list-inside">
            {slide.points.map((point, idx) => {
              return (
                <li key={idx} className="text-sm shrink">
                  {point}
                </li>
              );
            })}
          </ul>
          <div>
            <p className="text-center shrink text-sm font-bold">
              {slide.image_keywords[0]}
            </p>
            <img src={slide.image_url} className="object-cover" />
          </div>
        </div>
      </div>
    )
  );
}
