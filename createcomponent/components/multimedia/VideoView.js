import CreateComponent from "../../CreateComponent.js";

/**
 * ## VideoView `<video>`
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
 * @param param.loop A Boolean attribute; if specified,
 * the browser will automatically seek back to the start upon reaching the end of the video.
 * @param param.muted A Boolean attribute that indicates whether the audio will be initially silenced.
 * Its default value is false.
 * @param param.playsInline A Boolean attribute indicating that the video is to be played "inline",
 * that is within the element's playback area.
 * Note that the absence of this attribute does not imply that the video will always be played in fullscreen.
 * @param param.poster A URL for an image to be shown while the video is downloading.
 * If this attribute isn't specified, nothing is displayed until the first frame is available,
 * then the first frame is shown as the poster frame.
 * @param param.preload This enumerated attribute is intended to provide a hint to the browser
 * about what the author thinks will lead to the best user experience with regards to what content
 * is loaded before the video is played.
 * @param param.src The URL of the video to embed
 * @param width The width of the video's display area in pixel
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video
 */
export default ({
     children,
     style,
     styleSheet,
     id,
     autoplay,
     controls,
     crossOrigin,
     height,
     loop,
     muted,
     playsinline,
     poster,
     preload,
     src,
     width,
     className,
     events,
     renderIf = true,
     hooks,
     flags,
}) =>
     new CreateComponent({
          children,
          tag: "video",
          inlineStyle: style,
          renderIf,
          props: {
               id,
               autoplay,
               controls,
               crossOrigin,
               height,
               loop,
               muted,
               playsinline,
               poster,
               preload,
               src,
               width,
          },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
