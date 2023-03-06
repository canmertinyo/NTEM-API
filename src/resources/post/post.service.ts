import { PostModel } from '@/resources/post/post.model';
import { IPost } from '@/utils/interfaces';

export class PostService {
    private post = PostModel;

    public async create(title: string, body: string): Promise<IPost> {
        try {
            const post = await this.post.create({ title, body });
            return post;
        } catch (error) {
            throw new Error('something wrong with your post!');
        }
    }
}
