'use client';

import { Button } from '@/components/tailgrids/core/button';
import { useAppContext } from '@/context/AppContext';

export default function ProductsPage() {
  const { products, addToCart } = useAppContext();

  return (
    <div className="mx-auto my-4 max-w-4xl px-2">
      <div className="rounded-lg border border-gray-300 p-3 max-h-[540px] overflow-y-auto">
        {products.length === 0 ? (
          <p className="text-center py-8 text-gray-500">No products available</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-lg border border-gray-300 p-1.5 flex flex-col justify-between bg-white shadow-xs"
              >
                <div className="relative aspect-square overflow-hidden rounded-md bg-gray-100">
                  <img
                    src={product.thumbnailUrl}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-xs font-semibold text-white">
                    ${product.price.toFixed(2)}
                  </span>
                  <div className="absolute bottom-0 inset-x-0 bg-black/70 px-1.5 py-1 text-xs text-white line-clamp-2 leading-tight">
                    {product.title}
                  </div>
                </div>

                <Button
                  appearance="outline"
                  variant="success"
                  size="xs"
                  className="mt-2 w-full py-1.5 text-xs"
                  onPress={() => addToCart(product)}
                >
                  Add to Carts
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
