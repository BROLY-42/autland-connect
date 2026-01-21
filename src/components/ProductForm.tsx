import { useState, type FormEvent, type JSX } from "react";
import type { Product } from "@/data/products";

interface Props {
  initial?: Partial<Product>;
  onCancel?: () => void;
  onSubmit: (data: {
    name: string;
    description?: string;
    platform?: string;
    url: string;
    image?: string;
  }) => void;
}

const ProductForm = ({ initial = {}, onCancel, onSubmit }: Props) => {
  const [name, setName] = useState(initial.name || "");
  const [description, setDescription] = useState(initial.description || "");
  const [platform, setPlatform] = useState(initial.platform || "");
  const [url, setUrl] = useState(initial.url || "");
  const [image, setImage] = useState(initial.image || "");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("O nome é obrigatório.");
    if (!url.trim()) return setError("O link é obrigatório.");
    setError("");
    onSubmit({
      name: name.trim(),
      description: description.trim() || undefined,
      platform: platform.trim() || undefined,
      url: url.trim(),
      image: image.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <div className="text-sm text-red-600">{error}</div>}

      <div>
        <label className="block text-sm font-medium mb-1">Nome</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descrição</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Plataforma</label>
        <input
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">URL (afiliado)</label>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Imagem (URL)</label>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="input"
        />
      </div>

      <div className="flex gap-2">
        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
        <button type="button" onClick={onCancel} className="btn">
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
