import { Rocket, Trophy } from "lucide-react";

type HeaderProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Header({ setIsModalOpen }: HeaderProps) {
  return (
    <header className="px-6 py-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-stone-900 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-amber-500 fill-amber-100" />
            Goals & Vision
          </h1>
          <p className="text-stone-500 mt-2 font-medium">
            Target Kuartal 4 (Okt - Des)
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="hidden md:flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-2xl font-bold shadow-xl hover:scale-105 transition-transform"
        >
          <Rocket className="w-5 h-5" />
          Set New Goal
        </button>
      </div>
    </header>
  );
}
