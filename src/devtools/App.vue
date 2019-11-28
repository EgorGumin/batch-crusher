<template>
  <v-app>
    <v-content>
      <v-container>
        <v-row>
          <v-col>
            <calls-list :batches="calls"></calls-list>
          </v-col>
          <v-col>
            Detail
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { isBatch, createBatch } from "./batch/batch";
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
  methods: {
    addCall(call) {
      if (isBatch(call)) {
        debugger;
        const batch = createBatch(call);
        console.log(batch);
        call.getContent((content, encoding) => {
          console.log("Content: ", content, " ", encoding);
          content = atob(content);
          this.requests.push(content);
        });

        this.calls.push(batch);
      }
    }
  },
  mounted() {
    chrome.devtools.network.onRequestFinished.addListener(this.addCall);
  }
};
</script>
