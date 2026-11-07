'use client';

import { Badge } from '@/components/tailgrids/core/badge';
import { Button } from '@/components/tailgrids/core/button';
import { useAppContext } from '@/context/AppContext';

export default function CartsPage() {
  const { carts, removeFromCart } = useAppContext();

  const totalPrice = carts.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="mx-auto my-4 max-w-4xl px-2">
      <div className="rounded-lg border border-gray-300 p-3 max-h-[540px] overflow-y-auto">
        {carts.length === 0 ? (
          <p className="text-center py-8 text-gray-500">Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {carts.map((product) => (
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
                  variant="danger"
                  size="xs"
                  className="mt-2 w-full py-1.5 text-xs"
                  onPress={() => removeFromCart(product)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 flex justify-center gap-3">
        <Badge className="bg-amber-400 text-white font-semibold px-3 py-1 rounded-full text-xs sm:text-sm">
          Count: {carts.length} items
        </Badge>
        <Badge className="bg-red-500 text-white font-semibold px-3 py-1 rounded-full text-xs sm:text-sm">
          Price: ${totalPrice.toFixed(2)}
        </Badge>
      </div>
    </div>
  );
}
