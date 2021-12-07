import CreateComponent from "../../CreateComponent.js";

/**
 * ## TrackView `<track>`
 * *from MDN Docs*
 * ### The Video Embed element
 * The ``<video>`` HTML element embeds a media player which supports video playback into the document.
 * You can use ``<video>`` for audio content as well,
 * but the ``<audio>`` element may provide a more appropriate user experience.
 * @param param.autoplay A Boolean attribute; if specified,
 * the video automatically begins to play back as soon as it can do so
 * without stopping to finish loading the data.
 * @param param.controls If this attribute is present,
 * the browser will offer controls to allow the user to control video playback,
 * including volume, seeking, and pause/resume playback.
 * @param param.crossOrigin This enumerated attribute indicates whether to use CORS to fetch the related audio file.
 * @param param.src Address of the track (.vtt file). Must be a valid URL.
 * This attribute must be specified and its URL value must have the same origin as the document —
 * unless the ``<audio>`` or ``<video>`` parent element of the track element has a crossorigin attribute.
 * @param param.srcLang Language of the track text data
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track
 */
export default ({
     style,
     styleSheet,
     id,
     defaultTrack,
     kind,
     label,
     src,
     srcLang,
     className,
     events,
     hooks,
     flags,
}) =>
     new CreateComponent({
          tag: "track",
          inlineStyle: style,
          props: { id, kind, label, src, srcLang, default: defaultTrack },
          className: className,
          events: events,
          hooks,
          style: styleSheet,
          flags,
     });
