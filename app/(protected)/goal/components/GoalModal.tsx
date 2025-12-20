"use client";

import { Modal } from "@/components/Modal";
import { Gift } from "lucide-react";

type GoalModalProps = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function GoalModal({ setIsModalOpen }: GoalModalProps) {
  return (
    <Modal title="Buat Goal Baru" setIsModalOpen={setIsModalOpen}>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase mb-1">
            Judul Goal
          </label>
          <input
            type="text"
            placeholder="Apa target besarmu?"
            className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase mb-1">
            Motivasi (The Why)
          </label>
          <textarea
            placeholder="Kenapa ini penting bagimu?"
            rows={2}
            className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-indigo-500 resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">
              Hadiah (Reward)
            </label>
            <div className="flex items-center gap-2 p-3 bg-stone-50 border border-stone-200 rounded-xl">
              <Gift className="w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Self reward..."
                className="bg-transparent w-full outline-none text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-500 uppercase mb-1">
              Deadline
            </label>
            <input
              type="date"
              className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none text-sm"
            />
          </div>
        </div>
        <button className="w-full bg-stone-900 text-white py-2.5 rounded-xl mt-4 cursor-pointer">
          Start The Journey
        </button>
      </div>
    </Modal>
  );
}
