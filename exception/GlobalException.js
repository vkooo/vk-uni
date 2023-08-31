
import Vue from 'vue'

export default class GlobalException  extends Error {
	constructor(message) {
		super(message);
	}
}