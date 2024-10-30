<template>
  <div>
    <div class="fixed right-4 top-2">
      <img
        @click="openModal"
        class="cursor-pointer hover:scale-110"
        width="40px"
        height="40px"
        :src="add"
        alt="cart-icon"
      />
    </div>

    <div class="product-grid">
      <div
        class="product-card relative"
        v-for="(item, index) in data.products"
        :key="index"
      >
        <div v-if="item.is_best_seller" class="absolute">
          <div class="best-seller-badge">
            <img alt="" :src="bestSeller" />
          </div>
        </div>
        <div v-else class="absolute">
          <div class="best-seller-badge">
            <img alt="" :src="sale" />
          </div>
        </div>

        <img
          :src="hoveredImage[item.id] || item.image"
          alt="Product Image"
          class="product-image"
        />

        <div class="product-info">
          <h3>{{ item.name }}</h3>
          <p>Price: ￥{{ item.price }}</p>
          <p>Released Date: {{ formatDate(item.release_date) }}</p>
          <p>Brand: {{ item.brand }}</p>
          <p>Description: {{ item.description }}</p>

          <div class="quantity-select">
            <button class="minus" @click="decreaseQuantity(item)">-</button>
            <input
              type="number"
              v-model.number="item.quantity"
              class="quantity-input"
              :min="1"
            />
            <button class="plus" @click="increaseQuantity(item)">+</button>
          </div>
          <p v-if="errorMessage[item.id]" class="error-message">
            {{ errorMessage[item.id] }}
          </p>
          <div v-if="item.colors.length > 0">
            <p>Colors:</p>
            <ul class="flex flex-row justify-center items-center gap-2.5">
              <li
                v-for="color in item.colors"
                :key="color.id"
                @mouseover="handleMouseOver(item, color)"
                @mouseleave="handleMouseLeave(item)"
                @click="selectColor(item, color)"
                :class="{
                  'selected-color': selectedColors[item.id] === color.color,
                }"
              >
                <div class="flex items-center justify-center gap-0">
                  <div
                    class="product-color-dot"
                    :style="{ backgroundColor: color.color }"
                  ></div>
                </div>
                <span class="text-[#7f8c8d] rounded-[50%] font-bold">{{
                  color.quantity
                }}</span>
              </li>
            </ul>
          </div>

          <button
            class="add_to_cart"
            @click="addToCart(item)"
            :disabled="isAddToCartDisabled(item)"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <div class="close-modal" @click="closeModal">&times;</div>
        <h3 class="modal-title">Cart Items</h3>

        <div v-if="data.carts.length === 0" class="error-message">
          <img alt="" :src="notfound">
        </div>

        <div v-else class="cart-items overflow-y-scroll max-h-[400px]">
          <div
            v-for="(product, index) in data.carts"
            :key="index"
            class="cart-item"
          >
            <img
              :src="product.image"
              alt="Product in cart"
              class="cart-image"
            />
            <div class="cart-details">
              <span class="cart-name">{{ product.name }}</span>
              <span class="cart-price">{{ product.price }} VND</span>
              <div
                class="product-color-dot"
                :style="{ backgroundColor: product.selectedColor }"
              ></div>
              <span class="cart-quantity"
              >Quantity: {{ product.quantity }}</span
              >
            </div>
          </div>
        </div>

        <div v-if="data.carts.length > 0" class="total-price">
          Total: {{ totalMoney }} VND
        </div>
        <button v-if="data.carts.length > 0" class="checkout-button" @click="proceedToCheckout">
          Proceed to Checkout
        </button>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import bestSeller from '@/assets/best-seller_14178087.png'
import notfound from '@/assets/loi-404-removebg-preview.png'
import add from '@/assets/add-cart_6337238.png'
import sale from '@/assets/sale_3652368.png'
import { computed, onMounted, reactive, ref } from 'vue'
import dayjs from 'dayjs'
import { toast } from 'vue3-toastify'

const showModal = ref(false)
const openModal = () => (showModal.value = true)
const closeModal = () => (showModal.value = false)
const errorMessage = ref({})

const hoveredImage = reactive({})

const data = reactive({
  carts: [],
  products: [
    {
      id: 1,
      name: 'Giày gucci',
      price: 30000,
      release_date: '02-03-2020',
      is_best_seller: true,
      quantity: 1,
      brand: 'Gucci',
      description: 'This is giày gucci',
      image: 'https://cf.shopee.vn/file/159f966e9535c834b7dd5925842184c3',
      colors: [
        {
          id: 1,
          color: 'Red',
          quantity: 10,
          image: 'https://cf.shopee.vn/file/159f966e9535c834b7dd5925842184c3',
        },
        {
          id: 2,
          color: 'Black',
          quantity: 10,
          image:
            'https://giaycaosmartmen.com/wp-content/uploads/2020/12/cach-chup-giay-dep-5.jpg',
        },
        {
          id: 3,
          color: 'Green',
          quantity: 14,
          image:
            'https://www.chuphinhsanpham.vn/wp-content/uploads/2021/06/chup-hinh-giay-dincox-shoes-c-photo-studio-4.jpg',
        },
        {
          id: 4,
          color: 'Blue',
          quantity: 12,
          image:
            'https://bizweb.dktcdn.net/100/479/837/files/giay-sneaker-catsofa-love-mau-hong-3.jpg?v=1683458967345',
        },
      ],
    },
    {
      id: 2,
      name: 'Giày adidas',
      price: 25000,
      release_date: '04-05-2022',
      is_best_seller: false,
      quantity: 1,
      brand: 'Adidas',
      description: 'This is giày adidas',
      image:
        'https://bizweb.dktcdn.net/100/413/756/articles/gia-giay-adidas-neo-2.png?v=1620199623523',
      colors: [
        {
          id: 1,
          color: 'Red',
          quantity: 10,
          image: 'https://cf.shopee.vn/file/159f966e9535c834b7dd5925842184c3',
        },
        {
          id: 2,
          color: 'Black',
          quantity: 12,
          image:
            'https://giaycaosmartmen.com/wp-content/uploads/2020/12/cach-chup-giay-dep-5.jpg',
        },
        {
          id: 3,
          color: 'Green',
          quantity: 12,
          image:
            'https://www.chuphinhsanpham.vn/wp-content/uploads/2021/06/chup-hinh-giay-dincox-shoes-c-photo-studio-4.jpg',
        },
        {
          id: 4,
          color: 'Blue',
          quantity: 12,
          image:
            'https://bizweb.dktcdn.net/100/479/837/files/giay-sneaker-catsofa-love-mau-hong-3.jpg?v=1683458967345',
        },
      ],
    },
    {
      id: 3,
      name: 'Giày adidas',
      price: 25000,
      release_date: '04-05-2022',
      is_best_seller: false,
      quantity: 1,
      brand: 'Adidas',
      description: 'This is giày adidas',
      image:
        'https://bizweb.dktcdn.net/100/301/479/files/giay-bong-chuyen-spiking-do-den-3.jpg?v=1689065730862',
      colors: [
        {
          id: 1,
          color: 'Red',
          quantity: 10,
          image:
            'https://bizweb.dktcdn.net/100/301/479/files/giay-bong-chuyen-spiking-do-den-3.jpg?v=1689065730862',
        },
        {
          id: 2,
          color: 'Black',
          quantity: 10,
          image: 'https://humtto.vn/wp-content/uploads/2024/07/650221B-1.jpg',
        },
        {
          id: 3,
          color: 'Green',
          quantity: 10,
          image:
            'https://product.hstatic.net/1000230642/product/bsw003100vag__2__21853a04c3fe4704b5bd4e427062cb85_large.jpg',
        },
        {
          id: 4,
          color: 'Blue',
          quantity: 10,
          image:
            'https://file.hstatic.net/1000098702/file/giay-cau-long-kawasaki-3322-trang-xanh-chinh-hang-3_1710444947_aa29867f2e50480eb7a7f56353fe674c_grande.jpg',
        },
      ],
    },
    {
      id: 4,
      name: 'Giày adidas',
      price: 25000,
      release_date: '04-05-2022',
      is_best_seller: false,
      quantity: 1,
      brand: 'Adidas',
      description: 'This is giày adidas',
      image:
        'https://file.hstatic.net/1000098702/file/giay-cau-long-kawasaki-3322-trang-xanh-chinh-hang-4_1710445150_45c5ed61a7a84e7180b2636b5abee390_grande.jpg',
      colors: [
        {
          id: 1,
          color: 'Red',
          quantity: 10,
          image:
            'https://file.hstatic.net/1000098702/file/giay-cau-long-kawasaki-3322-trang-xanh-chinh-hang-4_1710445150_45c5ed61a7a84e7180b2636b5abee390_grande.jpg',
        },
        {
          id: 2,
          color: 'Black',
          quantity: 10,
          image:
            'https://cdn.shopify.com/s/files/1/0456/5070/6581/files/giay-converse-chuck-taylor-all-star_600x600.jpg?v=1664964827',
        },
        {
          id: 3,
          color: 'Green',
          quantity: 10,
          image:
            'https://product.hstatic.net/1000230642/product/giay-the-thao-nam-hunter-tennis-dsmh10200den-den-mxn7g-color-den_c0830234bb6f4dc289b2c72f8f903a84.jpg',
        },
        {
          id: 4,
          color: 'Blue',
          quantity: 10,
          image:
            'https://pos.nvncdn.com/b5a043-19330/ps/20240530_zCsaQEDBgO.jpeg',
        },
      ],
    },
    {
      id: 5,
      name: 'Giày adidas',
      price: 25000,
      release_date: '04-05-2022',
      is_best_seller: false,
      quantity: 1,
      brand: 'Adidas',
      description: 'This is giày adidas',
      image:
        'https://bizweb.dktcdn.net/100/413/756/articles/gia-giay-adidas-neo-2.png?v=1620199623523',
      colors: [
        {
          id: 1,
          color: 'Red',
          quantity: 10,
          image: 'https://cf.shopee.vn/file/159f966e9535c834b7dd5925842184c3',
        },
        {
          id: 2,
          color: 'Black',
          quantity: 17,
          image:
            'https://giaycaosmartmen.com/wp-content/uploads/2020/12/cach-chup-giay-dep-5.jpg',
        },
        {
          id: 3,
          color: 'Green',
          quantity: 15,
          image:
            'https://www.chuphinhsanpham.vn/wp-content/uploads/2021/06/chup-hinh-giay-dincox-shoes-c-photo-studio-4.jpg',
        },
        {
          id: 4,
          color: 'Blue',
          quantity: 19,
          image:
            'https://bizweb.dktcdn.net/100/479/837/files/giay-sneaker-catsofa-love-mau-hong-3.jpg?v=1683458967345',
        },
      ],
    },
    {
      id: 6,
      name: 'Giày adidas',
      price: 25000,
      release_date: '04-05-2022',
      is_best_seller: false,
      quantity: 1,
      brand: 'Adidas',
      description: 'This is giày adidas',
      image: 'https://chuhainam.com/wp-content/uploads/duvis-1.jpg',
      colors: [
        {
          id: 1,
          color: 'Red',
          quantity: 14,
          image: 'https://chuhainam.com/wp-content/uploads/duvis-1.jpg',
        },
        {
          id: 2,
          color: 'Black',
          quantity: 14,
          image:
            'https://cdn.shopify.com/s/files/1/0456/5070/6581/files/1RM02696G-896-1_540x.jpg?v=1729246438',
        },
        {
          id: 3,
          color: 'Green',
          quantity: 14,
          image:
            'https://taru.vn/image/cache/data/product-5763/H12115b-500x500.jpg',
        },
        {
          id: 4,
          color: 'Blue',
          quantity: 14,
          image:
            'https://product.hstatic.net/1000288768/product/z5827052355611_632ac40784cd8c4c2d0ab034a73e7038_67804cddc84c45e887728ef09091caa9_master.jpg',
        },
      ],
    },
  ],
})

const selectedColors = reactive({})
const saveCartToLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify(data.carts));
}
onMounted(() => {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    data.carts = JSON.parse(savedCart);
  }
});
function formatDate(date) {
  const parsedDate = dayjs(date, 'YY-MM-DDDD')
  return `Ngày ${parsedDate.format('DD')} tháng ${parsedDate.format('MM')} năm ${parsedDate.format('YYYY')}`
}

const selectColor = (item, color) => {
  selectedColors[item.id] = color.color
}

const increaseQuantity = item => {
  item.quantity++
}

const decreaseQuantity = item => {
  if (item.quantity > 1) item.quantity--
}

const addToCart = (product) => {
  const selectedColor = selectedColors[product.id];

  if (!selectedColor) {
    toast(
      `Bạn chưa chọn màu cho sản phẩm ${product.name}`,
      {
        theme: 'dark',
        type: 'error',
        position: 'top-left',
        dangerouslyHTMLString: true,
      }
    );
    return;
  }

  const colorProduct = product.colors.find(
    (color) => color.color === selectedColor
  );

  if (!colorProduct || colorProduct.quantity <= 0) {
    errorMessage.value[product.id] = 'Sản phẩm đã hết hàng';
    return;
  }

  if (product.quantity > colorProduct.quantity) {
    errorMessage.value[product.id] = 'Không đủ hàng trong kho';
    return;
  }

  const existingProduct = data.carts.find(
    (p) => p.id === product.id && p.selectedColor === selectedColor
  );

  if (existingProduct) {
    if (
      existingProduct.quantity + product.quantity >
      colorProduct.quantity
    ) {
      errorMessage.value[product.id] = 'Không đủ hàng trong kho';
      return;
    }
    existingProduct.quantity += product.quantity;
  } else {
    data.carts.push({
      ...product,
      selectedColor,
      quantity: product.quantity,
    });
  }

  colorProduct.quantity -= product.quantity;
  errorMessage.value[product.id] = '';

  saveCartToLocalStorage();

  toast(
    `Đã thêm ${product.name} (Color: ${selectedColor}) vào giỏ hàng với số lượng: ${product.quantity}`,
    {
      theme: 'dark',
      type: 'success',
      position: 'top-left',
      dangerouslyHTMLString: true,
    }
  );
};


const handleMouseOver = (item, color) => {
  hoveredImage[item.id] = color.image
}

const handleMouseLeave = item => {
  hoveredImage[item.id] = null
}

const totalMoney = computed(() =>
  data.carts.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  ),
)

const isAddToCartDisabled = item => {
  const selectedColor = selectedColors[item.id]
  if (!selectedColor) return
  const colorProduct = item.colors.find(color => color.color === selectedColor)
  return !colorProduct || colorProduct.quantity <= 0
}

function proceedToCheckout() {
  toast('Proceeding to checkout...', {
    theme: 'dark',
    type: 'success',
    position: 'top-left',
    dangerouslyHTMLString: true,
  });
  data.carts = [];
  localStorage.removeItem('cart');
  closeModal();
}

</script>

<style src="src/assets/mini_project.css">
</style>
