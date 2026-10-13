class Carrousel{
    #items;
    #element;
    #bullets = [];
    #interval;
    #current_item;
    #current_bullet;
    #carrousel_wrapper;
    #config = {
        slideStart: 0,
        transition: 0.5,
        autoplay: false,
        speed: 1000
    }

    constructor(address, config = {}){
        this.#element = document.querySelector(address);
        if(!this.#element){
            throw new Error("Elemento não encontrado");
        }

        this.#items = this.#element.querySelectorAll(":scope > *");
        this.#config = {
            ...this.#config,
            ...config
        }
    }

    #navigate_slide(index){
        this.#carrousel_wrapper.style.transform = `translateX(calc(${index} * (-100% / ${this.#items.length})))`;
        

        for(let i = 0; i < this.#items.length; i++){
            if(i.toString() === index){
                this.#current_item.classList.remove("carrousel-slide_active")
                this.#items[i].classList.add("carrousel-slide_active");
                this.#current_item = this.#items[i];
                break;
            }
        }
    }

    #wraper_slide(){
        const wrapper_slide = document.createElement("div");
        wrapper_slide.style.width = `calc(${this.#items.length} * 100%)`;
        wrapper_slide.style.transition = `${this.#config.transition}s`;
        wrapper_slide.className = "carrousel-wrapper";
        this.#carrousel_wrapper = wrapper_slide;

        return wrapper_slide;
    }

    #clean_container(){
        this.#element.innerHTML = "";
        this.#element.classList.add("content-carrousel");
    }

    #bullet_action(e){
        const clicked_bullet = e.currentTarget;
        const clicked_bullet_index = clicked_bullet.dataset.bulletItem;
        const current_bullet_index = this.#current_bullet.dataset.bulletItem;

        if(clicked_bullet_index !== current_bullet_index){
            this.#current_bullet.classList.remove("bullet-slide_active");
            clicked_bullet.classList.add("bullet-slide_active");
            this.#current_bullet = clicked_bullet;
            this.#navigate_slide(clicked_bullet_index);
            this.#config.slideStart = parseInt(clicked_bullet_index);

            if(this.#interval){
                clearInterval(this.#interval);
                this.#init_interval();
            }
        }
    }

    #create_bullets(){
        const bullet_wrapper = document.createElement("div");
        bullet_wrapper.className = "bullet-wrapper";
        this.#items.forEach((_item, index) => {
            const single_bullet = document.createElement("button");
            single_bullet.type = "button";

            single_bullet.classList.add("bullet-slide")
            single_bullet.dataset.bulletItem = index;

            if(index === this.#config.slideStart) {
                single_bullet.classList.add("bullet-slide_active")
                this.#current_bullet = single_bullet;
            }

            single_bullet.addEventListener("click", this.#bullet_action.bind(this));

            bullet_wrapper.appendChild(single_bullet);
            this.#bullets.push(single_bullet); 
        })

        return bullet_wrapper;
    }


    mount(){
        const carrousel_wrapper = this.#wraper_slide();

        this.#items.forEach((item, index) => {
            item.classList.add("carrousel-slide")
            item.dataset.carrouselItem = index;
            item.style.maxWidth = `calc(100% / ${this.#items.length})`;
            item.style.transition = `${this.#config.transition}s`;
            if(index === this.#config.slideStart){
                item.classList.add("carrousel-slide_active")
                this.#current_item = item;
            }
            carrousel_wrapper.appendChild(item);
        })

        const bullet_wrapper = this.#create_bullets()

        this.#clean_container();
        
        this.#element.append(carrousel_wrapper);
        this.#element.append(bullet_wrapper);

        this.#init_interval();
    }

    #init_interval(){
        const { autoplay, speed, slideStart } = this.#config;
        if(autoplay){
            let count = slideStart
            this.#interval = setInterval(() => {
                count = count === this.#items.length - 1 ? 0 : (count+1)
                this.#bullets[count].click();
            }, speed)
        }
    }

}