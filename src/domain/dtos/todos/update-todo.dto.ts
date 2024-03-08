

export class UpdateTodoDTO{

    private constructor(
        public readonly id?: number,
        public readonly text?: string,
        public readonly completedAt?: string
    ){}

    get values (){
        const retunObj: {[key:string]: any} ={};
        if( this.text ) retunObj.text = this.text;
        if( this.completedAt ) retunObj.completedAt = this.completedAt;

        return retunObj;
    }

    static create(props: { [key:string]: any }): [string?, UpdateTodoDTO?]{

        const {id, text, completedAt} = props;
        let newCompletedAt= completedAt;

        if(!id || isNaN(Number(id))){
            return ['id must be a valid number']
        }

        if(completedAt){
             newCompletedAt = new Date(completedAt)
            if(newCompletedAt.toString() === 'Invalid Date'){
                return ['CompletedAt must be a valid date']
            }
        }

        return [undefined, new UpdateTodoDTO(id, text, newCompletedAt)]
    }
}

