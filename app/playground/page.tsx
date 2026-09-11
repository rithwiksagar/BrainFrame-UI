import { MosaicTextActions } from "@/registry/new-york/MosaicTextActions/MosaicTextActions";

const DummyMessage = `Somewhere, right now, a person is looking at the same moon you are, even though you may never meet. They might be celebrating something, worrying about tomorrow, listening to music, or simply staring out a window.It’s strange how enormous the world is, yet tiny moments can connect people without either of them knowing. A song, a smell after rain, an old photograph, or even the moon can become a quiet reminder that everyone is carrying a story you’ll probably never hear.And maybe that’s what makes ordinary life so interesting: there are billions of stories happening simultaneously, most of them completely invisible to us.And maybe that’s what makes ordinary life so interesting: there are billions of stories happening simultaneously, most of them completely invisible to us.
`;

export default function Play(){
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-3xl relative text-justify text-xl whitespace-pre-wrap mask-[linear-gradient(to_bottom,black_0%,black_5%,transparent_100%)]">
        <MosaicTextActions>
          {DummyMessage}
        </MosaicTextActions>
      </div>
    </div>
  )
}