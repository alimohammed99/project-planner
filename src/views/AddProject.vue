<template>
    <div style="text-align: center; margin-top: 7%">
    
        <h1 id="hdd">Add a new project</h1>
    
    
    
        <form @submit.prevent="handleSubmit" action="">
    
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
    
                <button>Add project</button>
    
            </div>
    
        </form>
    
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: "",
            details: "",
        };
    },

    mounted() {},

    methods: {
        handleSubmit() {
            // saving all the form data into a variable (newProject) for easy entry to the db.
            let newProject = {
                title: this.title,
                details: this.details,
                isComplete: false,
            };
            fetch("http://localhost:3000/projects/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newProject),
                })
                .then(() => {
                    // "this.$router" is used to redirect.
                    this.$router.push("/");
                    // Pushing another route into the history.
                    // After adding a project, users should be redirected to the homepage('/') to see all projects.
                })
                .catch((err) => console.warn(err.message));
            // Incase there's any error..
        },
    },
};
</script>

<style>
#hdd {
    border-left: 70px groove red;
    border-bottom: 20px double grey;
    border-right: 70px groove red;
    padding: 15px;
    text-transform: uppercase;
}

form {
    background: white;
    padding: 20px;
    border-radius: 10px;
    border-bottom: 20px dashed grey;
}

textarea:focus,
input:focus {
    outline: none;
}

input,
textarea {
    font-size: 25px;
}

label {
    display: block;
    color: #817b7b;
    text-transform: uppercase;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 1px;
    margin: 20px 0 10px 0;
}

input {
    padding: 10px;
    border: 0;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    border-radius: 20px;
    width: 100%;
    box-sizing: border-box;
    height: 100px;
    color: indigo;
    font-weight: bolder;
}

textarea {
    border: 0;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    border-radius: 20px;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    height: 100px;
    color: brown;
    font-style: italic;
}

form button {
    display: block;
    margin: 20px auto 0;
    background: #00ce89;
    color: white;
    padding: 10px;
    border: 0;
    border-radius: 7px;
    font-size: 20px;
    cursor: pointer;
}
</style>
