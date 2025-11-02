"use client";

import { createClient } from "@/lib/client";
import { Edit3, ShoppingBag, Star, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image_url: string;
  description: string;
  colors: string[] | null;
  sizes: string[] | null;
};

type Review = {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user_id: string | null;
};

export default function ProductDetails({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState<any>(null);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");
  const [avgRating, setAvgRating] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);
  const router = useRouter();

  // === CARREGAR PRODUTO E AVALIAÇÕES ===
  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      const { data: productData } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();
      setProduct(productData);

      await reloadReviews();
    };

    loadData();
  }, [productId]);

  // === RECARREGAR AVALIAÇÕES ===
  const reloadReviews = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", productId)
      .order("created_at", { ascending: false });

    const count = data?.length || 0;
    const avg =
      count > 0
        ? data!.reduce((acc, r) => acc + (r.rating || 0), 0) / count
        : 0;

    setReviews(data || []);
    setTotalReviews(count);
    setAvgRating(Number(avg.toFixed(1)));
  };

  // === ADICIONAR AO CARRINHO ===
  const addToCart = async () => {
    if (!user) return router.push("/auth/login");
    if (!selectedColor || !selectedSize)
      return alert("Selecione cor e tamanho!");

    const supabase = createClient();
    const { error } = await supabase.from("cart_items").insert({
      user_id: user.id,
      product_id: productId,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
    });

    if (error) {
      alert("Erro ao adicionar!");
    } else {
      alert("Adicionado ao carrinho!");
    }
  };

  // === ENVIAR AVALIAÇÃO ===
  const submitReview = async () => {
    if (!user) return router.push("/auth/login");
    if (rating === 0 || comment.trim() === "")
      return alert("Dê uma nota e escreva um comentário.");

    const supabase = createClient();
    const { error } = await supabase.from("reviews").insert({
      product_id: productId,
      user_id: user.id,
      rating,
      comment,
    });

    if (error) return alert("Erro ao enviar.");
    setRating(0);
    setComment("");
    alert("Avaliação enviada!");
    await reloadReviews();
  };

  // === EXCLUIR AVALIAÇÃO ===
  const deleteReview = async (id: string, userId: string | null) => {
    if (!user || user.id !== userId) return alert("Sem permissão.");
    if (!confirm("Excluir sua avaliação?")) return;

    const supabase = createClient();
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) return alert("Erro ao excluir.");
    alert("Avaliação removida!");
    await reloadReviews();
  };

  // === ABRIR EDIÇÃO ===
  const openEdit = (review: Review) => {
    setEditingReview(review);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  // === SALVAR EDIÇÃO ===
  const saveEdit = async () => {
    if (!editingReview) return;
    const supabase = createClient();
    const { error } = await supabase
      .from("reviews")
      .update({ rating: editRating, comment: editComment })
      .eq("id", editingReview.id);

    if (error) {
      alert("Erro ao atualizar.");
      return;
    }

    alert("Avaliação atualizada!");
    setEditingReview(null);
    await reloadReviews();
  };

  // === RENDERIZAÇÃO ===
  if (!product) return <div className="text-center py-20">Carregando...</div>;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        {/* === IMAGEM === */}
        <div className="relative h-96 rounded-lg overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            width={600}
            height={600}
            className="object-cover w-full h-full"
          />
        </div>

        {/* === DETALHES === */}
        <div className="space-y-6">
          <h1
            className="font-serif text-4xl font-light"
            style={{ color: "#001F3F" }}
          >
            {product.name}
          </h1>

          {/* === MÉDIA GERAL === */}
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  fill={n <= Math.round(avgRating) ? "currentColor" : "none"}
                  className={`w-4 h-4 ${
                    n <= Math.round(avgRating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {avgRating.toFixed(1)} • {totalReviews}{" "}
              {totalReviews === 1 ? "avaliação" : "avaliações"}
            </span>
          </div>

          <p className="text-gray-600">{product.description}</p>
          <p className="font-semibold text-2xl" style={{ color: "#8B6F47" }}>
            R$ {product.price.toFixed(2)}
          </p>

          {/* === CORES === */}
          <div>
            <h3 className="font-medium">Cores:</h3>
            <div className="flex gap-2 mt-2">
              {(product.colors ?? []).map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded ${
                    selectedColor === color
                      ? "border-black bg-gray-100"
                      : "border-gray-300"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* === TAMANHOS === */}
          <div>
            <h3 className="font-medium">Tamanhos:</h3>
            <div className="flex gap-2 mt-2">
              {(product.sizes ?? []).map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size
                      ? "border-black bg-gray-100"
                      : "border-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* === BOTÃO CARRINHO === */}
          <button
            onClick={addToCart}
            className="px-8 py-3 text-white rounded-lg font-medium"
            style={{ background: "#D4AF37" }}
          >
            <ShoppingBag className="inline w-5 h-5 mr-2" />
            Adicionar ao Carrinho
          </button>
        </div>
      </div>

      {/* === AVALIAÇÕES === */}
      <div className="mt-20">
        <h2
          className="font-serif text-3xl font-light mb-8"
          style={{ color: "#001F3F" }}
        >
          Avaliações
        </h2>

        {reviews.length === 0 ? (
          <p className="text-gray-600 mb-4">Sem avaliações ainda.</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="border-b py-4">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    fill={i < r.rating ? "currentColor" : "none"}
                    className={`w-4 h-4 ${
                      i < r.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 mt-2">{r.comment}</p>
              <p className="text-sm text-gray-400">
                {new Date(r.created_at).toLocaleDateString("pt-BR")}
              </p>

              {user && user.id === r.user_id && (
                <div className="flex gap-3 mt-1">
                  <button
                    onClick={() => openEdit(r)}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                  >
                    <Edit3 className="w-4 h-4" /> Editar
                  </button>
                  <button
                    onClick={() => deleteReview(r.id, r.user_id)}
                    className="flex items-center gap-1 text-sm text-red-500 hover:underline"
                  >
                    <Trash2 className="w-4 h-4" /> Excluir
                  </button>
                </div>
              )}
            </div>
          ))
        )}

        {/* === FORMULÁRIO DE AVALIAÇÃO === */}
        <div className="mt-8 border-t pt-6">
          <h3 className="font-medium mb-3 text-[#001F3F]">
            Deixe sua avaliação
          </h3>
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <Star
                key={n}
                onClick={() => setRating(n)}
                fill={n <= rating ? "currentColor" : "none"}
                className={`w-6 h-6 cursor-pointer transition ${
                  n <= rating
                    ? "text-yellow-400"
                    : "text-gray-300 hover:text-yellow-400"
                }`}
              />
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Escreva sua opinião sobre este produto..."
            className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#D4AF37]"
            rows={4}
          />

          <button
            onClick={submitReview}
            className="mt-4 bg-[#D4AF37] text-[#001F3F] font-semibold px-6 py-2 rounded-full hover:bg-[#b8942f]"
          >
            Enviar Avaliação ⭐
          </button>
        </div>
      </div>

      {/* === MODAL DE EDIÇÃO === */}
      {editingReview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
            <button
              onClick={() => setEditingReview(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-[#001F3F] mb-3">
              Editar Avaliação
            </h3>
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star
                  key={n}
                  onClick={() => setEditRating(n)}
                  fill={n <= editRating ? "currentColor" : "none"}
                  className={`w-6 h-6 cursor-pointer transition ${
                    n <= editRating
                      ? "text-yellow-400"
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                />
              ))}
            </div>
            <textarea
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
              className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#D4AF37]"
              rows={4}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditingReview(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 rounded-lg bg-[#D4AF37] text-[#001F3F] font-semibold hover:bg-[#b8942f] text-sm"
              >
                Salvar alterações
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
