<!-- Chat.vue -->
<template>

  <va-card>

    <div  class="flex h-[800px] overflow-scroll antialiased text-gray-800">
      <div class="flex flex-row h-full w-full overflow-x-hidden">
        <div class="flex flex-col py-8 pl-6 pr-2 w-36 lg:w-96 bg-white flex-shrink-0">
          <div class="flex flex-row items-center justify-center h-12 w-full">
            <div
              class="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
            </div>
            <div class="ml-2 font-bold text-2xl">live chat</div>
          </div>
          <div style="overflow-y: scroll !important;">

            <DataTable
                  v-model:selection="selectedProducts"
                  :value="elements"
                  :loading="loading"
                  data-key="id"
                  :rows="10"
                  style="overflow-x: hidden; !important"
                  >
                  <Column  field="Images" header="All Chat "  header-style="width:14%; min-width:10rem;">
                    <template #body="slotProps" >
                       <div   class="flex py-5 px-2 justify-between h-full hover:cursor-pointer hover:bg-[#cce9e5] " @click="getone(slotProps.data.id)">
                        <a  style="background-color: none; !important width: 100%; !important"   >
                          {{ slotProps.data.message[0].user?.user.name }}
                        </a>
                        <span class="rounded-full bg-[#098071] text-center px-1 text-white" v-if="seen">{{ seen }}</span>

                       </div>
                    </template>
                  </Column>

                  </DataTable>
          </div>


        </div>
        <div class="flex flex-col flex-auto h-full p-6">

          <div

            class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
          >
           <div class="w-full text-center "><img class="mx-auto" src="../../../assets/dark_mursheed.png"></div>
            <div   ref="scrollableDiv" class="flex flex-col h-full overflow-x-auto mb-4">
              <div class="flex flex-col h-full">

                <div  v-for="ma in onemassege" class="grid grid-cols-12 gap-y-2">

                  <div class="col-start-1 col-end-8 p-3 rounded-lg">
                    <div   v-if="ma.type == 'messages' "   class="flex flex-row items-center">

                      <div
                        class="relative ml-3 text-white text-sm bg-[#088070] py-2 px-4 shadow rounded-xl"
                      >
                      <div  >{{ma.content}}</div>
                      </div>
                    </div>
                  </div>
                  <div class="col-start-6 col-end-13 p-3 rounded-lg">
                    <div v-if="ma.type == 'replies' "        class="flex items-center justify-start flex-row-reverse">

                      <div

                        class="relative mr-3 text-white text-sm bg-[#DE4915] py-2 px-4 shadow rounded-xl"
                      >
                        <div  >
                          {{ ma.content }}
                        </div>

                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
            <div
              style="background-image: '../../../assets/dark_mursheed.png' !important;" class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
            >
              <div>

              </div>
              <div class="flex-grow ml-4">
                <div class="relative w-full">
                  <input
                  v-model="maggage_text"
                    type="text"
                    class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  />

                </div>
              </div>
              <div class="ml-4">

                <button
                 @click="sendMessage " class="flex items-center justify-center  bg-[#1e4e48] hover:bg-[#19413d] rounded-xl text-white px-4 py-2 flex-shrink-0"
                >

                  <span>Send</span>

                  <span class="ml-2">
                    <svg
                      class="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </va-card>
</template>

<script>
import { ref, onMounted,watch } from 'vue';
import Pusher from 'pusher-js';
import axios from "axios";
export default {
  setup() {
    const scrollableDiv = ref(null)
    const onemassege=ref('')
    const x=ref(0)
    const elements=ref('')
    const messages = ref([]);
    const newMessage = ref('');
    const user_id=ref('')
    const maggage_text=ref('')
    const seen =ref('')
    // Initialize Pusher
    const pusher = new Pusher('da17743bc3150f478753', {
      cluster: 'eu',
    });

    // Subscribe to a Pusher channel
    const channel = pusher.subscribe('Replay');

    // Listen for 'new-message' event from the channel
    channel.bind('SendReplay', data => {
      console.log(data.jsonData.message.content)

      console.log(data.jsonData.message.conversation_id)
      console.log(user_id.value)
      if(user_id.value == data.jsonData.message.conversation_id ){

        onemassege.value.push(data.jsonData.message)
      }

      setTimeout(() => {

scrollToEnd();
    }, 1000)

    });
    watch(x, async () => {


setTimeout(() => {

  axios.get(`api/chat/oneConversationWeb/${user_id.value}`).then((res) => {
          onemassege.value=res.data.conversation

     console.log(res.data.data)
})
    }, 3000)

setTimeout(() => {

scrollToEnd();
    }, 6000)
});

    // Function to send a new message

      const getone = (id) => {
        user_id.value=id
        axios.get(`api/chat/oneConversationWeb/${id}`).then((res) => {
          onemassege.value=res.data.conversation

     console.log(res.data.data)

})
setTimeout(() => {

  scrollToEnd();
      }, 3000)

    };
    const scrollToEnd = () => {
      if (scrollableDiv.value) {
        scrollableDiv.value.scrollTop = scrollableDiv.value.scrollHeight;
      }
    };
      const sendMessage = () => {
        x.value=x.value + 1
        const body = new FormData();
    body.append("content",maggage_text.value );
  body.append("conversation_id",user_id.value);
        axios.post('api/chat/Replies' , body).then((res) => {

        maggage_text.value=''
     console.log(res.data.data)
})

    };

    // Cleanup on component unmount
    onMounted(() => {

      axios.get('/api/chat/AllConversation').then((res) => {
        elements.value=res.data.data

     console.log(res.data.data)
})
      return () => {
        pusher.disconnect();
      };
    });

    return {
      maggage_text,
      elements,
      messages,
      newMessage,
      sendMessage,
      getone,
      onemassege,
      user_id,
      x,
      seen,
      scrollableDiv,
      scrollToEnd
    };
  },
};
</script>
<style>

td{
  border: 0px !important;


}

tr:focus  {
  color:red  !important;
  background-color: #E0E7FF !important;
  border-radius:2% !important;

  z-index: 20 !important;

}

/* Add the styles to hide the scrollbar */
.hide-scrollbar::-webkit-scrollbar  {
  display: none !important;
}

.hide-scrollbar {
  scrollbar-width: none !important;
}

/* For Firefox */
.hide-scrollbar {
  -ms-overflow-style: none !important;
}


</style>
