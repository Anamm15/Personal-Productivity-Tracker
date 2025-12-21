import { useState, useEffect } from "react";
import { getStatusConfig } from "@/helpers/badge";
import { TaskResponse } from "@/types/dto/task";
import { formatDate } from "@/utils/datetime";
import {
  Calendar,
  Clock,
  AlignLeft,
  Tag,
  Bell,
  Trash2,
  Edit,
  ArrowRight,
  Save,
  X,
} from "lucide-react";
import { useDeleteTask, useUpdateTask } from "../../dashboard/hooks/useTasks";
import FormInput from "@/components/form/Input";
import FormTextarea from "@/components/form/TextArea";
import FormSelect from "@/components/form/Select";

type DetailTaskModalProps = {
  task: TaskResponse | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DetailTaskModal({
  task,
  setIsModalOpen,
}: DetailTaskModalProps) {
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<TaskResponse>>({});

  useEffect(() => {
    if (task) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        title: task.title,
        description: task.description,
        startTime: task.startTime,
        endTime: task.endTime,
        status: task.status,
        reminder: task.reminder,
        tags: task.tags,
      });
    }
  }, [task]);

  if (!task) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler Update Tags (Simple comma separated logic)
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsArray = e.target.value.split(",").map((tag) => tag.trim());
    setFormData((prev) => ({ ...prev, tags: tagsArray }));
  };

  const handleSave = () => {
    const payload = {
      ...formData,
      startTime: formData.startTime ? formData.startTime.slice(0, 5) : null,
      endTime: formData.endTime ? formData.endTime.slice(0, 5) : null,
    };
    console.log(payload);

    updateTask(
      { id: task.id, data: payload as TaskResponse },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleDelete = () => {
    if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
      deleteTask(task.id);
      setIsModalOpen(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const statusConfig = getStatusConfig((formData.status as any) || task.status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="space-y-6">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-start gap-4">
        <div className="space-y-3 flex-1">
          {/* Status Badge (Editable dropdown if editing) */}
          {isEditing ? (
            <FormSelect
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={[
                { value: "COMPLETED", label: "Selesai" },
                { value: "IN_PROGRESS", label: "Sedang Dikerjakan" },
                { value: "CANCELED", label: "Dibatalkan" },
                { value: "PENDING", label: "Menunggu" },
              ]}
            />
          ) : (
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${statusConfig.color}`}
            >
              <StatusIcon className="w-3.5 h-3.5" />
              <span>{statusConfig.label}</span>
            </div>
          )}

          {/* Title Input vs Text */}
          {isEditing ? (
            <FormInput
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Judul Tugas"
            />
          ) : (
            <h2 className="text-2xl font-bold text-stone-900 leading-tight">
              {task.title}
            </h2>
          )}
        </div>
      </div>

      {/* --- TIME & DATE GRID --- */}
      <div className="grid grid-cols-1 gap-3">
        {/* Date Field */}
        <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm text-stone-600">
            <Calendar className="w-5 h-5" />
          </div>
          <div className="w-full">
            <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">
              Tanggal
            </p>
            <p className="text-sm font-semibold text-stone-800">
              {formatDate(task.date)}
            </p>
          </div>
        </div>

        {/* Time Field */}
        <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm text-stone-600">
            <Clock className="w-5 h-5" />
          </div>
          <div className="w-full">
            <p className="text-xs text-stone-500 font-medium uppercase tracking-wide">
              Waktu
            </p>
            {isEditing ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime || ""}
                  onChange={handleChange}
                  className="bg-transparent border-b border-stone-300 text-sm font-semibold text-stone-900 focus:border-stone-900 outline-none w-20"
                />
                <span>-</span>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime || ""}
                  onChange={handleChange}
                  className="bg-transparent border-b border-stone-300 text-sm font-semibold text-stone-900 focus:border-stone-900 outline-none w-20"
                />
              </div>
            ) : (
              <p className="text-sm font-semibold text-stone-800">
                {task.startTime} - {task.endTime}
              </p>
            )}
          </div>
        </div>

        {/* Reminder Field */}
        {(isEditing || task.reminder) && (
          <div className="md:col-span-2 bg-amber-50 p-3 rounded-xl border border-amber-100 flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm text-amber-600">
              <Bell className="w-5 h-5" />
            </div>
            <div className="w-full">
              <p className="text-xs text-amber-600 font-bold uppercase tracking-wide">
                Pengingat
              </p>
              {isEditing ? (
                <input
                  type="time"
                  name="reminder"
                  value={formData.reminder || ""}
                  onChange={handleChange}
                  className="bg-transparent border-b border-amber-300 text-sm font-medium text-stone-800 focus:border-amber-600 outline-none w-full mt-1"
                />
              ) : (
                <p className="text-sm font-medium text-stone-800">
                  Diatur untuk pukul {task.reminder}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <hr className="border-stone-100" />

      {/* --- DESCRIPTION --- */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-stone-900 font-semibold">
            <AlignLeft className="w-4 h-4 text-stone-400" />
            <h3>Deskripsi</h3>
          </div>
          <div className="pl-6 w-full">
            {isEditing ? (
              <FormTextarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            ) : task.description ? (
              <p className="text-stone-600 text-sm leading-relaxed whitespace-pre-line">
                {task.description}
              </p>
            ) : (
              <p className="text-stone-400 text-sm italic">
                Tidak ada deskripsi tambahan.
              </p>
            )}
          </div>
        </div>

        {/* --- TAGS --- */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-stone-900 font-semibold">
            <Tag className="w-4 h-4 text-stone-400" />
            <h3>Tags</h3>
          </div>
          <div className="pl-6">
            {isEditing ? (
              <input
                type="text"
                name="tags"
                // Gabungkan array jadi string comma-separated untuk input
                value={formData.tags?.join(", ") || ""}
                onChange={handleTagsChange}
                className="w-full p-2 bg-stone-50 border border-stone-200 rounded-lg text-sm focus:ring-stone-900 focus:border-stone-900 outline-none"
                placeholder="Contoh: Design, Priority, Work (pisahkan koma)"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {task.tags && task.tags.length > 0 ? (
                  task.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-stone-100 text-stone-600 text-xs font-medium rounded-full border border-stone-200"
                    >
                      #{tag}
                    </span>
                  ))
                ) : (
                  <span className="text-stone-400 text-xs italic">No Tags</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- ACTION FOOTER --- */}
      <div className="pt-6 mt-6 border-t border-stone-100 flex justify-between items-center">
        {isEditing ? (
          <button
            onClick={() => {
              setIsEditing(false);
              if (task) setFormData(task);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-stone-500 hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Batal</span>
          </button>
        ) : (
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors group"
          >
            <Trash2 className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Hapus</span>
          </button>
        )}

        {/* KANAN */}
        <div className="flex gap-3">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-stone-900 text-white hover:bg-stone-800 shadow-lg hover:shadow-stone-900/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)} // Aktifkan Mode Edit
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors border border-stone-200"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>

              {task.status !== "COMPLETED" && (
                <button
                  // Anggap tombol selesai juga memanggil updateTask status
                  onClick={() =>
                    updateTask({
                      id: task.id,
                      data: { ...task, status: "COMPLETED" },
                    })
                  }
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-stone-900 text-white hover:bg-stone-800 shadow-lg hover:shadow-stone-900/20 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  <span>Selesai</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
