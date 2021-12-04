import CreateComponent from "../../CreateComponent.js";

/**
 * ## AudioView `<audio>`
 * *from MDN Docs*
 * ### The Image Map Area element
 * The ``<area>`` HTML element defines an area inside an image map that has predefined clickable areas.
 * An image map allows geometric areas on an image to be associated with hypertext link.
 * This element is used only within a ``<map>`` element.
 * @param param.alt A Boolean attribute: if specified,
 * the audio will automatically begin playback as soon as it can do so,
 * without waiting for the entire audio file to finish downloading.
 * @param param.controls If this attribute is present, the browser will offer controls
 * to allow the user to control audio playback,
 * including volume, seeking, and pause/resume playback.
 * @param param.crossOrigin This enumerated attribute indicates whether to use CORS to fetch the related audio file.
 * @param param.loop A Boolean attribute: if specified,
 * the audio player will automatically seek back to the start upon reaching the end of the audio.
 * @param param.muted A Boolean attribute that indicates whether the audio will be initially silenced.
 * Its default value is false.
 * @param param.preload This enumerated attribute is intended to provide
 * a hint to the browser about what the author thinks will lead to the best user experience
 * @param param.src The URL of the audio to embed. This is subject to HTTP access controls. This is optional;
 * you may instead use the ``<source>`` element within the audio block to specify the audio to embed.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
 */
export default ({
     children,
     style,
     styleSheet,
     id,
     autoplay,
     controls,
     crossOrigin,
     loop,
     muted,
     preload,
     src,
     className,
     events,
     renderIf = true,
     hooks,
     flags,
}) =>
     new CreateComponent({
          tag: "audio",
          children,
          inlineStyle: style,
          renderIf,
          props: { id, autoplay, controls, crossOrigin, loop, muted, preload, src },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
