<template>
    <div class="error-container">
        <div class="error-indicator">
            <img class="error-indicator__icon" src="../assets/images/error.png" alt='Error'/>
            <div class="error-indicator__text">
                <h2>Error! Something gone wrong...</h2>
                <p>Sorry, we can't load this resource now. Please try again later.</p>
            </div>
        </div>
    </div>

</template>

<style lang="scss">
    .error-container {
        width: 100%;
    }

    .error-indicator {
        max-width: 500px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;

        &__text {
            max-width: 65%;

            h2 {
                font-size: 20px;
            }

            p {
                font-size: 14px;
            }
        }

        &__icon {
            max-width: 100px;
            max-height: 100px;
        }
    }
</style>