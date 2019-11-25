<template>
  <v-app>
    <v-content>
      <v-container>
        <calls-list :calls="calls"></calls-list>
        <div v-for="request in requests" :key="request.connection">
          {{ request }}
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { isBatch } from "./batch/batch";
import CallsList from "./CallsList";

export default {
  name: "App",
  components: {
    CallsList
  },
  data() {
    return {
      message: "Hello batch",
      requests: [],
      calls: []
    };
  },
  mounted() {
    chrome.devtools.network.onRequestFinished.addListener(call => {
      if (isBatch(call)) {
        // debugger;
        // console.log(call);
        call.getContent((content, encoding) => {
          console.log("Content: ", content, " ", encoding);
          content = atob(content);
          this.requests.push(content);
        });

        this.calls.push(call);
      }
    });
  }
};
</script>
