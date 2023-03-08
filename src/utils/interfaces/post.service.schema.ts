import { IPost } from './post.interface';

export abstract class PostServiceSchema {
    protected abstract create(title: string, body: string): Promise<IPost>;
}
