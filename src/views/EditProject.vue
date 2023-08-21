<template>
    <div>
    
        <h1>Edit Project</h1>
    
    
    
        <form @submit="handleEdit" action="">
    
            <!-- ".prevent" prevents the form from reloading every time which is the default tradition of html forms.  -->
    
    
    
            <div>
    
                <label style="color: indigo" for="">Title:</label>
    
    
    
                <input type="text" v-model="title" required />
    
            </div>
    
    
    
            <br /><br /><br />
    
    
    
            <div>
    
                <label style="color: brown" for="">Details:</label>
    
    
    
                <textarea v-model="details" id="" cols="30" rows="10" required></textarea>
    
            </div>
    
    
    
            <div>
    
                <button>Update</button>
    
            </div>
    
        </form>
    
    </div>
</template>

<script>
export default {
    props: ["xy"],
    // 'xy' is the parameter sent from the Projects page, passed to the route.
    data() {
        return {
            title: "",
            details: "",
            uri: " http://localhost:3000/projects/" + this.xy,
        };
    },
    mounted() {
        fetch(this.uri)
            .then((res) => res.json())
            .then((data) => {
                this.title = data.title;
                this.details = data.details;
            });
    },
    methods: {
        handleEdit() {
            let newData = {
                title: this.title,
                details: this.details,
            };

            fetch(this.uri, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newData),
                })
                .then(() => {
                    this.$router.push("/");
                })
                .catch((err) => console.warn(err.message));
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
