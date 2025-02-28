export interface observer {
    // update is called every time the subject wants to notify the observer
    update(): void
}

export class subject {
    // internal array of observers that have added themselves to the subject
    private _observers: observer[] = []

    // addObserver allows for ebservers to add themselves to receive notifications from the subject
    addObserver(obs: observer) {
        this._observers.push(obs)
        obs.update()
    }

    // notifyObservers notifies all observers that have added themselves to the subject
    notifyObservers() {
        this._observers.forEach(obs => obs.update())
    }
}