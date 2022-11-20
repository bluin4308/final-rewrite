import create from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      clothes: [],

      // addCloth добавление вещи/нового размера из модалки
      addCloth: ({ id, type }) => {
        // если ID есть в массиве clothes
        const index = get().clothes.findIndex((item) => item.id === id);
        if (index >= 0) {
          const currentClothObject = { ...get().clothes[index] };
          let { quantityL, quantityM, quantityS } = currentClothObject;
          switch (type) {
            case "s":
              !!quantityS ? quantityS++ : (quantityS = 1);
              break;
            case "m":
              !!quantityM ? quantityM++ : (quantityM = 1);
              break;
            case "l":
              !!quantityL ? quantityL++ : (quantityL = 1);
              break;
            default:
              break;
          }
          set((state) => {
            const currentClothesArray = [...state.clothes];
            currentClothesArray[index] = currentClothObject;
            return { clothes: currentClothesArray };
          });
        }
        // если ID в массиве нет
        else {
          const newClothObject = {
            id: id,
          };
          let { quantityL, quantityM, quantityS } = newClothObject;
          switch (type) {
            case "s":
              quantityS = 1;
              break;
            case "m":
              quantityM = 1;
              break;
            case "l":
              quantityL = 1;
              break;
            default:
              break;
          }
          set((state) => {
            const currentClothesArray = [...state.clothes];
            currentClothesArray.push(newClothObject);
            return { clothes: currentClothesArray };
          });
        }
      },

      // deleteCloth удаление вещи целиком (Cart)
      deleteCloth: ({ id }) => {
        const index = get().clothes.findIndex((item) => item.id === id);
        set((state) => {
          const currentClothesArray = [...state.clothes];
          currentClothesArray.splice(index, 1);
          return { clothes: currentClothesArray };
        });
      },

      // changeSize изменить размер (Cart)
      changeSize: ({ id, action, type }) => {
        const index = get().clothes.findIndex((item) => item.id === id);
        const currentClothObject = { ...get().clothes[index] };
        let { quantityL, quantityM, quantityS } = currentClothObject;
        if (action === "+" && type === "s") {
          !!quantityS ? quantityS++ : (quantityS = 1);
        }

        if (action === "+" && type === "m") {
          !!quantityM ? quantityM++ : (quantityM = 1);
        }

        if (action === "+" && type === "l") {
          !!quantityL ? quantityL++ : (quantityL = 1);
        }

        if (action === "-" && type === "s") {
          !!quantityS ? quantityS-- : (quantityS = 0);
        }

        if (action === "-" && type === "m") {
          !!quantityM ? quantityM-- : (quantityM = 0);
        }

        if (action === "-" && type === "l") {
          !!quantityL ? quantityL-- : (quantityL = 0);
        }

        set((state) => {
          const currentClothesArray = [...state.clothes];
          currentClothesArray[index] = currentClothObject;
          return { clothes: currentClothesArray };
        });
      },

      addSize: ({ id, type }) => {
        const index = get().clothes.findIndex((item) => item.id === id);
        const currentClothObject = { ...get().clothes[index] };
        let { quantityL, quantityM, quantityS } = currentClothObject;
        switch (type) {
          case "s":
            !!quantityS ? quantityS++ : quantityS === 1;
            break;

          case "m":
            !!quantityM ? quantityM++ : quantityM === 1;
            break;

          case "l":
            !!quantityL ? quantityL++ : quantityL === 1;
            break;
        }
      },

      deleteSize: ({ id, type }) => {
        const index = get().clothes.findIndex((item) => item.id === id);
        const currentClothObject = { ...get().clothes[index] };
        let { quantityL, quantityM, quantityS } = currentClothObject;
        switch (type) {
          case "s":
            !!quantityS ? quantityS-- : quantityS === 0;
            break;

          case "m":
            !!quantityM ? quantityM-- : quantityM === 0;
            break;

          case "l":
            !!quantityL ? quantityL-- : quantityL === 0;
            break;
        }
      },

      // написать добавление стоимости в cloth для методов addCloth, addSize, deleteSize
      // usecase: click Buy button(Modal) -> cloth нет в массиве clothes ->
      //  -> addCloth({id,type,price(тут проверка на скидку через isSale)})

      // usecase: click Buy button(Modal) -> cloth есть в массиве -> внутри else в addCloth
    }),
    {
      name: "clothes",
    }
  )
);

export const useTitle = create((set) => ({
  title: "",
  setTitle: (title) => {
    set({ title: title });
  },
}));

export default useStore;
