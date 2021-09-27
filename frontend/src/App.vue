<template>
  <div class="btn">
    <button @click="createConnection">Connect!</button>
    <div class="client" v-if="client.connected">{{ `${client.options.clientId} is Connected to broker "${connection.host}:${connection.port}"` }}</div>
  </div>

  <div class="publish">
    <input type="text" v-model="message" />
    <button @click="publishHandler">Publish</button>
  </div>

  <div class="subscribe">
    <div class="message" 
      v-for="(msg, idx) in receiveNews" 
      :key="idx"> 
    {{ msg }}
  </div>
  </div>
</template>


<script>
import mqtt from 'mqtt'
export default {
  data() {
    return {
      connection: {
        host: 'localhost',
        port: 8888,
      },
      topic: "test",
      receiveNews: [],
      message: "",
      client: {
        connected: false,
      },
    }
  },

  methods: {
    createConnection() {
      const { host, port } = this.connection;
      const connectUrl = `ws://${host}:${port}`
      try {
        this.client = mqtt.connect(connectUrl)
        this.client.connected = true;
      } catch (error) {
        console.log('mqtt.connect error', error)
      }
      this.client.on('connect', () => {
        this.client.subscribe(this.topic);
      })
      this.client.on('message', (topic, message) => {
        let today = new Date();
        this.receiveNews.push(`[${today.toLocaleString()}] ${message.toString()}`);
      })
    },
    publishHandler() {
      console.log('Publishing!');
      this.client.publish(this.topic, this.message);
    },
  }
}
</script>

<style scoped>
.publish {
  margin: 15px 0;
  width: 250px;
  height: 45px;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
}

.subscribe {
  box-sizing: border-box;
  padding: 10px;
  width: 500px;
  height: 800px;
  background-color: gray;
}
.subscribe > .message {
  width: 100%;
  margin: 0 auto;
  background-color: white;
  padding: 5px;
  box-sizing: border-box;
}
</style>