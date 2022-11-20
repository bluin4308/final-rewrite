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
          switch (type) {
            case "s":
              !!currentClothObject.quantityS
                ? currentClothObject.quantityS++
                : (currentClothObject.quantityS = 1);
              break;
            case "m":
              !!currentClothObject.quantityM
                ? currentClothObject.quantityM++
                : (currentClothObject.quantityM = 1);
              break;
            case "l":
              !!currentClothObject.quantityL
                ? currentClothObject.quantityL++
                : (currentClothObject.quantityL = 1);
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
          switch (type) {
            case "s":
              newClothObject.quantityS = 1;
              break;
            case "m":
              newClothObject.quantityM = 1;
              break;
            case "l":
              newClothObject.quantityL = 1;
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

      addSize: ({ id, type }) => {
        const index = get().clothes.findIndex((item) => item.id === id);
        const currentClothObject = { ...get().clothes[index] };

        if (type === "s") {
          !!currentClothObject.quantityS
            ? currentClothObject.quantityS++
            : (currentClothObject.quantityS = 1);
        }
        if (type === "m") {
          !!currentClothObject.quantityM
            ? currentClothObject.quantityM++
            : (currentClothObject.quantityM = 1);
        }
        if (type === "l") {
          !!currentClothObject.quantityL
            ? currentClothObject.quantityL++
            : (currentClothObject.quantityL = 1);
        }
        set((state) => {
          const currentClothesArray = [...state.clothes];
          currentClothesArray[index] = currentClothObject;
          return { clothes: currentClothesArray };
        });
      },

      deleteSize: ({ id, type }) => {
        const index = get().clothes.findIndex((item) => item.id === id);
        const currentClothObject = { ...get().clothes[index] };
        switch (type) {
          case "s":
            !!currentClothObject.quantityS
              ? currentClothObject.quantityS--
              : (currentClothObject.quantityS = 0);
            break;

          case "m":
            !!currentClothObject.quantityM
              ? currentClothObject.quantityM--
              : (currentClothObject.quantityM = 0);
            break;

          case "l":
            !!currentClothObject.quantityL
              ? currentClothObject.quantityL--
              : (currentClothObject.quantityL = 0);
            break;
        }
        set((state) => {
          const currentClothesArray = [...state.clothes];
          currentClothesArray[index] = currentClothObject;
          return { clothes: currentClothesArray };
        });
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
